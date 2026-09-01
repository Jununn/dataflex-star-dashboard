import fs from "node:fs/promises";
import path from "node:path";
import { execFile as execFileCallback } from "node:child_process";
import { promisify } from "node:util";

const execFile = promisify(execFileCallback);
const root = path.resolve(new URL("..", import.meta.url).pathname);
const dataDir = path.join(root, "data");
const cacheDir = path.join(dataDir, "github-cache");
const outputPath = path.join(dataDir, "dataflex-overlap.json");
const curlConfigPath = path.join(dataDir, ".curl-gh-config");
const repo = "OpenDCAI/DataFlex";
const months = (process.env.MONTHS || "2026-08,2026-07").split(",").map((month) => month.trim()).filter(Boolean);
const perUserStarLimit = 200;
const batchSize = Number(process.env.BATCH_SIZE || 8);
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || (await readGhToken());

if (!token) {
  throw new Error("Missing GitHub token. Set GITHUB_TOKEN or ensure ~/.config/gh/hosts.yml has oauth_token.");
}

await fs.mkdir(cacheDir, { recursive: true });
await fs.writeFile(curlConfigPath, `header = "Authorization: Bearer ${token}"\n`);
await fs.chmod(curlConfigPath, 0o600);

async function readGhToken() {
  try {
    const hosts = await fs.readFile(path.join(process.env.HOME || "/Users/jun", ".config/gh/hosts.yml"), "utf8");
    return hosts.match(/oauth_token:\s*(\S+)/)?.[1] || "";
  } catch {
    return "";
  }
}

async function readJson(file) {
  try {
    return JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    return null;
  }
}

async function writeJson(file, value) {
  await fs.writeFile(file, `${JSON.stringify(value, null, 2)}\n`);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function gqlString(value) {
  return JSON.stringify(String(value));
}

function normalizeRepo(node) {
  return {
    full_name: node.nameWithOwner,
    html_url: node.url,
    description: node.description || "",
    language: node.primaryLanguage?.name || "-",
    stargazers_count: node.stargazerCount || 0,
    forks_count: node.forkCount || 0
  };
}

async function graphql(query) {
  const queryFile = path.join(dataDir, `.graphql-${Date.now()}-${Math.random().toString(16).slice(2)}.json`);
  await writeJson(queryFile, { query });
  try {
    for (let attempt = 1; attempt <= 4; attempt += 1) {
      try {
        const { stdout } = await execFile(
            "curl",
            [
                "-sS",
                "--connect-timeout",
                "20",
                "--retry",
                "4",
            "--retry-delay",
            "2",
            "--retry-all-errors",
            "-K",
            curlConfigPath,
            "-H",
            "Accept: application/vnd.github+json",
            "-H",
            "Content-Type: application/json",
            "-w",
            "\n%{http_code}",
            "--data-binary",
            `@${queryFile}`,
            "https://api.github.com/graphql"
          ],
          { maxBuffer: 50 * 1024 * 1024 }
        );
        const split = stdout.lastIndexOf("\n");
        const body = stdout.slice(0, split);
        const status = Number(stdout.slice(split + 1));
        if (status >= 200 && status < 300) {
          const parsed = JSON.parse(body);
          if (parsed.errors?.length) {
            throw new Error(JSON.stringify(parsed.errors).slice(0, 1000));
          }
          return parsed.data;
        }
        throw new Error(`${status} ${body.slice(0, 500)}`);
      } catch (error) {
        if (attempt === 4) throw error;
        console.log(`graphql failed, retry ${attempt}: ${String(error).split("\n")[0]}`);
        await sleep(attempt * 3000);
      }
    }
  } finally {
    await fs.rm(queryFile, { force: true });
  }
}

async function githubStarJson(url) {
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    const { stdout } = await execFile(
      "curl",
      [
        "-sS",
        "--connect-timeout",
        "20",
        "--retry",
        "4",
        "--retry-delay",
        "2",
        "--retry-all-errors",
        "-K",
        curlConfigPath,
        "-H",
        "Accept: application/vnd.github.star+json",
        "-H",
        "X-GitHub-Api-Version: 2022-11-28",
        "-H",
        "User-Agent: dataflex-star-dashboard",
        "-w",
        "\n%{http_code}",
        url
      ],
      { maxBuffer: 50 * 1024 * 1024 }
    );
    const split = stdout.lastIndexOf("\n");
    const body = stdout.slice(0, split);
    const status = Number(stdout.slice(split + 1));
    if (status >= 200 && status < 300) return JSON.parse(body);
    if (attempt === 4) throw new Error(`${status} ${url}\n${body.slice(0, 500)}`);
    await sleep(attempt * 3000);
  }
  throw new Error(`Failed after retries: ${url}`);
}

async function fetchStargazers() {
  const cacheFile = path.join(cacheDir, "dataflex-stargazers.json");
  const cached = await readJson(cacheFile);
  if (cached?.length && process.env.REFRESH_STARGAZERS !== "1") return cached;

  const rows = [];
  for (let page = 1; ; page += 1) {
    const pageRows = await githubStarJson(`https://api.github.com/repos/${repo}/stargazers?per_page=100&page=${page}`);
    rows.push(...pageRows);
    console.log(`stargazers page ${page}: +${pageRows.length}, total ${rows.length}`);
    if (pageRows.length < 100) break;
    await sleep(250);
  }
  await writeJson(cacheFile, rows);
  return rows;
}

async function cachedStarred(login) {
  const cacheFile = path.join(cacheDir, `starred-${login}.json`);
  const cached = await readJson(cacheFile);
  return Array.isArray(cached) && cached.length ? cached : null;
}

async function writeStarred(login, repos) {
  await writeJson(path.join(cacheDir, `starred-${login}.json`), repos);
}

async function fetchBatchPage(users, cursors = new Map()) {
  const fields = users
    .map((user, index) => {
      const after = cursors.get(user.login);
      const afterArg = after ? `, after: ${gqlString(after)}` : "";
      return `u${index}: user(login: ${gqlString(user.login)}) {
        login
        starredRepositories(first: 100${afterArg}, orderBy: {field: STARRED_AT, direction: DESC}) {
          pageInfo { hasNextPage endCursor }
          nodes { nameWithOwner url description stargazerCount forkCount primaryLanguage { name } }
        }
      }`;
    })
    .join("\n");
  return graphql(`query { ${fields} }`);
}

async function fetchStarredForUsers(users) {
  let completed = 0;
  for (let i = 0; i < users.length; i += batchSize) {
    const batch = users.slice(i, i + batchSize);
    const missing = [];
    for (const user of batch) {
      if (await cachedStarred(user.login)) {
        completed += 1;
      } else {
        missing.push(user);
      }
    }
    if (!missing.length) {
      console.log(`batch ${i / batchSize + 1}: cached, completed ${completed}/${users.length}`);
      continue;
    }

    const first = await fetchBatchPage(missing);
    const cursors = new Map();
    const reposByLogin = new Map();
    const secondPageUsers = [];
    missing.forEach((user, index) => {
      const payload = first[`u${index}`]?.starredRepositories;
      const repos = (payload?.nodes || []).map(normalizeRepo);
      reposByLogin.set(user.login, repos);
      if (payload?.pageInfo?.hasNextPage && repos.length < perUserStarLimit) {
        cursors.set(user.login, payload.pageInfo.endCursor);
        secondPageUsers.push(user);
      }
    });

    if (secondPageUsers.length) {
      const second = await fetchBatchPage(secondPageUsers, cursors);
      secondPageUsers.forEach((user, index) => {
        const payload = second[`u${index}`]?.starredRepositories;
        const repos = reposByLogin.get(user.login) || [];
        repos.push(...(payload?.nodes || []).map(normalizeRepo));
        reposByLogin.set(user.login, repos.slice(0, perUserStarLimit));
      });
    }

    for (const user of missing) {
      await writeStarred(user.login, reposByLogin.get(user.login) || []);
      completed += 1;
    }
    console.log(`batch ${i / batchSize + 1}: fetched ${missing.length}, completed ${completed}/${users.length}`);
    await sleep(500);
  }
}

function classify(repoRow) {
  const fullName = repoRow.full_name.toLowerCase();
  const text = `${repoRow.full_name} ${repoRow.description || ""} ${repoRow.language || ""}`.toLowerCase();
  if (fullName.includes("dataflow") || text.includes("data selection") || text.includes("data mixture") || text.includes("reweight") || text.includes("dataset")) return "Data selection / dataset";
  if (text.includes("llama") || text.includes("training") || text.includes("finetun") || text.includes("deepspeed") || text.includes("trl")) return "LLM training";
  if (text.includes("rag") || text.includes("retrieval") || text.includes("vector") || text.includes("knowledge")) return "RAG / retrieval";
  if (text.includes("agent") || text.includes("workflow") || text.includes("mcp")) return "Agent / workflow";
  if (text.includes("eval") || text.includes("benchmark") || text.includes("alignment") || text.includes("rlhf") || text.includes("reward")) return "Evaluation / alignment";
  if (text.includes("data") || text.includes("etl") || text.includes("pipeline") || text.includes("lakehouse")) return "Data pipeline";
  return "Other";
}

function relationFor(repoRow, category) {
  const fullName = (repoRow.full_name || repoRow.name || "").toLowerCase();
  if (fullName === "opendcai/dataflow") return "上游搭档";
  if (["Data selection / dataset", "LLM training", "Evaluation / alignment"].includes(category)) return "典型相关";
  if (["Data pipeline", "RAG / retrieval", "Agent / workflow"].includes(category)) return "场景相邻";
  return "弱相关";
}

function scenarioFor(repoRow, category) {
  const name = repoRow.full_name;
  if (name === "OpenDCAI/DataFlow") return "DataFlow 准备和清洗数据，DataFlex 承接训练阶段的数据选择、混合比例和 reweighting。";
  if (category === "Data selection / dataset") return "与 DataFlex 的核心能力最接近，可用于解释数据选择、数据混合和数据质量控制的差异化。";
  if (category === "LLM training") return "训练框架用户需要把选好的样本接入 SFT、pretrain 或 alignment 流程，是 DataFlex 最直接的下游入口。";
  if (category === "Evaluation / alignment") return "偏好数据、reward 数据和评测集都依赖样本分布控制，可作为 DataFlex 后续案例。";
  if (category === "Data pipeline") return "偏数据准备前置链路，适合讲 DataFlow/DataFlex 串联，而不是直接竞品叙事。";
  if (category === "RAG / retrieval") return "RAG 场景关注数据质量和文档选择，可作为 DataFlex 方法向检索数据治理扩展的观察信号。";
  if (category === "Agent / workflow") return "Agent/workflow 需要高质量任务数据和评测数据，DataFlex 可作为实验数据策略层。";
  return "泛技术兴趣信号，保留观察，但不应作为主传播场景。";
}

async function summarizeMonth(month, users) {
  const repoMap = new Map();
  const categoryCounts = new Map();
  let fetched = 0;
  let failed = 0;

  for (const user of users) {
    const starred = await cachedStarred(user.login);
    if (!Array.isArray(starred)) {
      failed += 1;
      continue;
    }
    fetched += 1;
    const seen = new Set();
    for (const repoRow of starred) {
      if (!repoRow?.full_name || repoRow.full_name === repo || seen.has(repoRow.full_name)) continue;
      seen.add(repoRow.full_name);
      const category = classify(repoRow);
      categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);
      if (!repoMap.has(repoRow.full_name)) {
        repoMap.set(repoRow.full_name, { ...repoRow, category, users: new Set() });
      }
      repoMap.get(repoRow.full_name).users.add(user.login);
    }
  }

  const topRepos = [...repoMap.values()]
    .map((item) => {
      const overlap = item.users.size;
      return {
        name: item.full_name,
        url: item.html_url,
        overlap,
        share: fetched ? overlap / fetched : 0,
        relation: relationFor(item, item.category),
        category: item.category,
        stars: item.stargazers_count || 0,
        forks: item.forks_count || 0,
        description: item.description,
        scenario: scenarioFor(item, item.category),
        language: item.language || "-"
      };
    })
    .sort((a, b) => b.overlap - a.overlap || b.stars - a.stars)
    .slice(0, 40);

  const categoryTotal = [...categoryCounts.values()].reduce((sum, value) => sum + value, 0);
  const categories = [...categoryCounts.entries()]
    .map(([category, count]) => ({ category, count, share: categoryTotal ? count / categoryTotal : 0 }))
    .sort((a, b) => b.count - a.count);

  return { month, users: users.length, fetched, failed, perUserStarLimit, topRepos, categories };
}

const stargazers = await fetchStargazers();
const usersByMonth = new Map(months.map((month) => [month, []]));
for (const item of stargazers) {
  const month = item.starred_at?.slice(0, 7);
  if (usersByMonth.has(month)) usersByMonth.get(month).push({ login: item.user.login, starredAt: item.starred_at });
}

const allUsers = [...new Map(months.flatMap((month) => usersByMonth.get(month).map((user) => [user.login, user]))).values()];
console.log(`target users: ${allUsers.length}`);
await fetchStarredForUsers(allUsers);

const previousOutput = (await readJson(outputPath)) || {};
const output = {
  generatedAt: new Date().toISOString(),
  repo,
  months: {
    ...(previousOutput.months || {}),
    ...Object.fromEntries(await Promise.all(months.map(async (month) => [month, await summarizeMonth(month, usersByMonth.get(month))])))
  }
};
await writeJson(outputPath, output);
console.log(`wrote ${outputPath}`);
