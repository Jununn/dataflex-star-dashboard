import fs from "node:fs/promises";
import path from "node:path";
import { execFile as execFileCallback } from "node:child_process";
import { promisify } from "node:util";

const execFile = promisify(execFileCallback);

const root = path.resolve(new URL("..", import.meta.url).pathname);
const dataDir = path.join(root, "data");
const cacheDir = path.join(dataDir, "github-cache");
const outputPath = path.join(dataDir, "dataflex-overlap.json");
const repo = "OpenDCAI/DataFlex";
const months = ["2026-08", "2026-07"];
const perUserStarLimit = 200;
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || (await readGhToken());
const curlConfigPath = path.join(dataDir, ".curl-gh-config");

if (!token) {
  throw new Error("Missing GitHub token. Set GITHUB_TOKEN or ensure ~/.config/gh/hosts.yml has oauth_token.");
}

await fs.mkdir(cacheDir, { recursive: true });
await fs.writeFile(curlConfigPath, `header = "Authorization: Bearer ${token}"\n`);
await fs.chmod(curlConfigPath, 0o600);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function readGhToken() {
  try {
    const home = process.env.HOME || "/Users/jun";
    const hosts = await fs.readFile(path.join(home, ".config/gh/hosts.yml"), "utf8");
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

async function githubJson(url, accept = "application/vnd.github+json") {
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    let stdout;
    try {
      ({ stdout } = await execFile(
        "curl",
        [
          "-sS",
          "--connect-timeout",
          "15",
          "--retry",
          "5",
          "--retry-delay",
          "2",
          "--retry-all-errors",
          "-K",
          curlConfigPath,
          "-H",
          `Accept: ${accept}`,
          "-H",
          "X-GitHub-Api-Version: 2022-11-28",
          "-H",
          "User-Agent: dataflex-star-dashboard",
          "-w",
          "\n%{http_code}",
          url
        ],
        { maxBuffer: 30 * 1024 * 1024 }
      ));
    } catch (error) {
      if (attempt < 4) {
        const waitMs = attempt * 3000;
        console.log(`curl failed, retrying in ${waitMs / 1000}s: ${url}`);
        await sleep(waitMs);
        continue;
      }
      throw error;
    }

    const split = stdout.lastIndexOf("\n");
    const body = stdout.slice(0, split);
    const status = Number(stdout.slice(split + 1));

    if (status === 403 || status === 429) {
      const waitMs = 60_000;
      console.log(`rate limited or forbidden (${status}), waiting ${Math.round(waitMs / 1000)}s`);
      await sleep(waitMs);
      continue;
    }

    if (status < 200 || status >= 300) {
      if (attempt < 4 && status >= 500) {
        await sleep(attempt * 2000);
        continue;
      }
      throw new Error(`${status} ${url}\n${body.slice(0, 500)}`);
    }

    return JSON.parse(body);
  }
  throw new Error(`Failed after retries: ${url}`);
}

async function fetchStargazers() {
  const cacheFile = path.join(cacheDir, "dataflex-stargazers.json");
  const cached = await readJson(cacheFile);
  if (cached?.length) return cached;

  const rows = [];
  for (let page = 1; ; page += 1) {
    const url = `https://api.github.com/repos/${repo}/stargazers?per_page=100&page=${page}`;
    const pageRows = await githubJson(url, "application/vnd.github.star+json");
    rows.push(...pageRows);
    console.log(`stargazers page ${page}: +${pageRows.length}, total ${rows.length}`);
    if (pageRows.length < 100) break;
    await sleep(250);
  }
  await writeJson(cacheFile, rows);
  return rows;
}

async function fetchUserStarred(login) {
  const cacheFile = path.join(cacheDir, `starred-${login}.json`);
  const cached = await readJson(cacheFile);
  if (Array.isArray(cached) && cached.length) return cached;

  const repos = [];
  try {
    for (let page = 1; page <= Math.ceil(perUserStarLimit / 100); page += 1) {
      const url = `https://api.github.com/users/${encodeURIComponent(login)}/starred?per_page=100&page=${page}&sort=created`;
      const pageRows = await githubJson(url);
      repos.push(...pageRows);
      if (pageRows.length < 100) break;
      await sleep(150);
    }
    const trimmed = repos.slice(0, perUserStarLimit);
    await writeJson(cacheFile, trimmed);
    return trimmed;
  } catch (error) {
    const message = String(error);
    if (
      message.includes("Could not resolve host") ||
      message.includes("Failed to connect") ||
      message.includes("curl failed") ||
      message.includes("Command failed: curl")
    ) {
      throw error;
    }
    return { error: message.slice(0, 500), login };
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

function summarizeMonth(month, users, starredByUser) {
  const repoMap = new Map();
  const categoryCounts = new Map();
  let fetched = 0;
  let failed = 0;

  for (const user of users) {
    const starred = starredByUser.get(user.login);
    if (!Array.isArray(starred)) {
      failed += 1;
      continue;
    }
    fetched += 1;
    const seen = new Set();
    for (const repoRow of starred) {
      if (!repoRow?.full_name || repoRow.full_name === repo) continue;
      if (seen.has(repoRow.full_name)) continue;
      seen.add(repoRow.full_name);
      const category = classify(repoRow);
      categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);
      if (!repoMap.has(repoRow.full_name)) {
        repoMap.set(repoRow.full_name, {
          name: repoRow.full_name,
          url: repoRow.html_url,
          description: repoRow.description || "",
          language: repoRow.language || "-",
          stars: repoRow.stargazers_count || 0,
          forks: repoRow.forks_count || 0,
          category,
          users: new Set()
        });
      }
      repoMap.get(repoRow.full_name).users.add(user.login);
    }
  }

  const topRepos = [...repoMap.values()]
    .map((item) => {
      const overlap = item.users.size;
      return {
        name: item.name,
        url: item.url,
        overlap,
        share: fetched ? overlap / fetched : 0,
        relation: relationFor(item, item.category),
        category: item.category,
        stars: item.stars,
        forks: item.forks,
        description: item.description,
        scenario: scenarioFor(item, item.category),
        language: item.language
      };
    })
    .sort((a, b) => b.overlap - a.overlap || b.stars - a.stars)
    .slice(0, 40);

  const categoryTotal = [...categoryCounts.values()].reduce((sum, value) => sum + value, 0);
  const categories = [...categoryCounts.entries()]
    .map(([category, count]) => ({
      category,
      count,
      share: categoryTotal ? count / categoryTotal : 0
    }))
    .sort((a, b) => b.count - a.count);

  return {
    month,
    users: users.length,
    fetched,
    failed,
    perUserStarLimit,
    topRepos,
    categories
  };
}

const stargazers = await fetchStargazers();
const usersByMonth = new Map(months.map((month) => [month, []]));
for (const item of stargazers) {
  const month = item.starred_at?.slice(0, 7);
  if (usersByMonth.has(month)) {
    usersByMonth.get(month).push({
      login: item.user.login,
      starredAt: item.starred_at
    });
  }
}

const allUsers = [...new Map([...usersByMonth.values()].flat().map((user) => [user.login, user])).values()];
console.log(`target users: ${allUsers.length}`);

const starredByUser = new Map();
for (let index = 0; index < allUsers.length; index += 1) {
  const user = allUsers[index];
  const starred = await fetchUserStarred(user.login);
  starredByUser.set(user.login, starred);
  if ((index + 1) % 25 === 0 || index === allUsers.length - 1) {
    console.log(`users fetched ${index + 1}/${allUsers.length}`);
  }
}

const output = {
  generatedAt: new Date().toISOString(),
  repo,
  months: Object.fromEntries(
    months.map((month) => [month, summarizeMonth(month, usersByMonth.get(month), starredByUser)])
  )
};

await writeJson(outputPath, output);
console.log(`wrote ${outputPath}`);
