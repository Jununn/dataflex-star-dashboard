import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const appPath = join(root, "app.js");
const indexPath = join(root, "index.html");
const repoName = "OpenDCAI/DataFlex";
const dailyCountsStartDate = "2025-12-31";

function utcDate(date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date, delta) {
  const cursor = new Date(`${date}T00:00:00Z`);
  cursor.setUTCDate(cursor.getUTCDate() + delta);
  return utcDate(cursor);
}

function datesBetween(start, end) {
  const out = [];
  for (let d = new Date(`${start}T00:00:00Z`), last = new Date(`${end}T00:00:00Z`); d <= last; d.setUTCDate(d.getUTCDate() + 1)) {
    out.push(utcDate(d));
  }
  return out;
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function beijingMinute(date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).formatToParts(date).reduce((acc, part) => {
    acc[part.type] = part.value;
    return acc;
  }, {});
  return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}`;
}

function readConstArray(source, name) {
  const match = source.match(new RegExp(`const ${name} = (\\[[\\s\\S]*?\\n\\]);`));
  if (!match) throw new Error(`Cannot find ${name}`);
  return Function(`return ${match[1]};`)();
}

function readConstObject(source, name) {
  const match = source.match(new RegExp(`const ${name} = (\\{[\\s\\S]*?\\n\\};)`));
  if (!match) throw new Error(`Cannot find ${name}`);
  return Function(`return ${match[1]}`)();
}

function readConstString(source, name) {
  const match = source.match(new RegExp(`(?:const|let) ${name} = "([^"]+)";`));
  if (!match) throw new Error(`Cannot find ${name}`);
  return match[1];
}

function readGhToken() {
  try {
    const hosts = readFileSync(join(process.env.HOME || "/Users/jun", ".config/gh/hosts.yml"), "utf8");
    return hosts.match(/oauth_token:\s*(\S+)/)?.[1] || "";
  } catch {
    return "";
  }
}

function renderRows(rows) {
  return `[\n${rows.map(([date, count]) => `  ["${date}", ${count}]`).join(",\n")}\n]`;
}

function replaceConstArray(source, name, rows) {
  return source.replace(new RegExp(`const ${name} = \\[[\\s\\S]*?\\n\\];`), `const ${name} = ${renderRows(rows)};`);
}

function renderSnapshot(snapshot) {
  return `{
  date: "${snapshot.date}",
  time: "${snapshot.time}",
  timelineEnd: "${snapshot.timelineEnd}",
  stars: ${snapshot.stars},
  forks: ${snapshot.forks},
  watchers: ${snapshot.watchers},
  createdAt: "${snapshot.createdAt}",
  pushedAt: "${snapshot.pushedAt}",
  description:
    "${snapshot.description}"
}`;
}

function replaceSnapshot(source, snapshot) {
  return source.replace(/const snapshot = \{[\s\S]*?\n\};/, `const snapshot = ${renderSnapshot(snapshot)};`);
}

function renderSnapshotMap(snapshots) {
  const body = Object.entries(snapshots)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, totals]) => `  "${date}": {\n${Object.entries(totals).map(([name, total]) => `    "${name}": ${total}`).join(",\n")}\n  }`)
    .join(",\n");
  return `{\n${body}\n}`;
}

function renderPoints(points) {
  return `[\n${points.map(([date, value]) => `      ["${date}", ${value}]`).join(",\n")}\n    ]`;
}

function renderBenchmarkRepos(repos) {
  const body = repos.map((repo) => `  {
    name: "${repo.name}",
    stars: ${repo.stars},
    forks: ${repo.forks},
    recentChange: ${repo.recentChange ?? 0},
    yesterdayChange: ${Number.isFinite(repo.yesterdayChange) ? repo.yesterdayChange : "null"},
    color: "${repo.color}",
    note: "${repo.note}",
    points: ${renderPoints(repo.points || [])}
  }`).join(",\n");
  return `[\n${body}\n]`;
}

function replaceConstObject(source, name, object) {
  return source.replace(new RegExp(`const ${name} = \\{[\\s\\S]*?\\n\\};`), `const ${name} = ${renderSnapshotMap(object)};`);
}

function replaceConstString(source, name, value) {
  return source.replace(new RegExp(`((?:const|let) ${name} = ")[^"]+(";)`), `$1${value}$2`);
}

function replaceBenchmarkRepos(source, repos) {
  return source.replace(/const benchmarkRepos = \[[\s\S]*?\n\];\n\nconst byDateActions =/, `const benchmarkRepos = ${renderBenchmarkRepos(repos)};\n\nconst byDateActions =`);
}

function splitRepo(fullName) {
  const [owner, name] = fullName.split("/");
  return { owner, name };
}

async function updateBenchmarkRepos(source, currentDate) {
  const benchmarkRepos = readConstArray(source, "benchmarkRepos");
  const benchmarkSnapshots = readConstObject(source, "benchmarkSnapshots");
  const previousDate = Object.keys(benchmarkSnapshots).filter((date) => date < currentDate).sort().at(-1)
    || readConstString(source, "benchmarkPreviousSnapshotDate");
  const previousTotals = benchmarkSnapshots[previousDate] || {};
  const nextSnapshots = { ...benchmarkSnapshots, [currentDate]: {} };
  const nextRepos = [];
  const yesterday = addDays(currentDate, -1);

  for (const repo of benchmarkRepos) {
    const info = await github(`/repos/${repo.name}`);
    nextSnapshots[currentDate][repo.name] = info.stargazers_count;
    const hasPreviousTotal = Object.hasOwn(previousTotals, repo.name);
    const previousTotal = hasPreviousTotal ? previousTotals[repo.name] : repo.stars;
    const points = new Map(repo.points || []);
    if (hasPreviousTotal && !points.has(previousDate) && Number.isFinite(previousTotal)) {
      points.set(previousDate, previousTotal);
    }
    points.set(currentDate, info.stargazers_count);
    const recentStargazers = await recentStargazersSince(repo.name, yesterday);
    const yesterdayChange = recentStargazers.filter((item) => item.starred_at?.slice(0, 10) === yesterday).length;
    nextRepos.push({
      ...repo,
      stars: info.stargazers_count,
      forks: info.forks_count,
      recentChange: info.stargazers_count - previousTotal,
      yesterdayChange,
      points: [...points.entries()].sort(([a], [b]) => a.localeCompare(b))
    });
  }

  source = replaceConstString(source, "benchmarkSnapshotDate", currentDate);
  source = replaceConstString(source, "benchmarkPreviousSnapshotDate", previousDate);
  source = replaceConstObject(source, "benchmarkSnapshots", nextSnapshots);
  source = replaceBenchmarkRepos(source, nextRepos);
  return source;
}

async function github(path, options = {}) {
  const token = githubToken();
  const headers = {
    "User-Agent": "dataflex-dashboard-updater",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };
  let res;
  try {
    res = await fetch(`https://api.github.com${path}`, {
      ...options,
      headers
    });
  } catch (error) {
    return curlJson(`https://api.github.com${path}`, { method: options.method || "GET", headers, body: options.body, path });
  }
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub API ${res.status} for ${path}: ${body.slice(0, 240)}`);
  }
  return res.json();
}

function curlJson(url, { method = "GET", headers = {}, body, path = url } = {}) {
  const addresses = (process.env.GITHUB_API_RESOLVE || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const resolveOptions = addresses.length ? addresses : [""];
  let lastError = "";
  for (const address of resolveOptions) {
    const args = ["-sS", "--retry", "3", "--retry-all-errors", "--connect-timeout", "12", "-X", method];
    if (address) {
      args.push("--resolve", `api.github.com:443:${address}`);
    }
    for (const [name, value] of Object.entries(headers)) {
      args.push("-H", `${name}: ${value}`);
    }
    if (body) args.push("--data-binary", body);
    args.push("-w", "\n%{http_code}", url);
    try {
      const output = execFileSync("curl", args, { encoding: "utf8" });
      const splitAt = output.lastIndexOf("\n");
      const text = output.slice(0, splitAt);
      const status = Number(output.slice(splitAt + 1));
      if (status < 200 || status >= 300) {
        throw new Error(`GitHub API ${status} for ${path}: ${text.slice(0, 240)}`);
      }
      return JSON.parse(text);
    } catch (error) {
      lastError = String(error.stderr || error.message || "").replace(/Bearer\s+\S+/g, "Bearer ***");
    }
  }
  throw new Error(`GitHub API curl failed for ${path}: ${lastError.slice(0, 240)}`);
}

function githubToken() {
  return process.env.GH_TOKEN || process.env.GITHUB_TOKEN || readGhToken();
}

async function graphql(query, variables) {
  const token = githubToken();
  if (!token) throw new Error("Missing GitHub token for GraphQL stargazer query.");
  const requestBody = JSON.stringify({ query, variables });
  const headers = {
    "User-Agent": "dataflex-dashboard-updater",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };
  let body;
  let ok;
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers,
      body: requestBody
    });
    body = await res.json();
    ok = res.ok;
  } catch (error) {
    body = curlJson("https://api.github.com/graphql", { method: "POST", headers, body: requestBody, path: "/graphql" });
    ok = true;
  }
  if (!ok || body.errors?.length) {
    throw new Error(`GitHub GraphQL failed for ${JSON.stringify(variables)}: ${JSON.stringify(body.errors || body).slice(0, 240)}`);
  }
  return body.data;
}

async function recentStargazersSince(targetRepo, startDate) {
  const { owner, name } = splitRepo(targetRepo);
  const startTimestamp = `${startDate}T00:00:00Z`;
  const rows = [];
  let cursor = null;
  for (let page = 0; page < 10; page += 1) {
    const data = await graphql(
      `query RecentStargazers($owner: String!, $name: String!, $cursor: String) {
        repository(owner: $owner, name: $name) {
          stargazers(first: 100, after: $cursor, orderBy: { field: STARRED_AT, direction: DESC }) {
            pageInfo { hasNextPage endCursor }
            edges { starredAt }
          }
        }
      }`,
      { owner, name, cursor }
    );
    const connection = data.repository?.stargazers;
    const edges = connection?.edges || [];
    if (!edges.length) break;
    rows.push(...edges.filter((edge) => edge.starredAt >= startTimestamp).map((edge) => ({ starred_at: edge.starredAt })));
    const oldest = edges.map((edge) => edge.starredAt).filter(Boolean).sort()[0];
    if (!connection.pageInfo.hasNextPage || (oldest && oldest < startTimestamp)) break;
    cursor = connection.pageInfo.endCursor;
  }
  return rows;
}

async function stargazersSince(totalStars, startDate, targetRepo = repoName) {
  const maxPage = Math.ceil(totalStars / 100);
  const startTimestamp = `${startDate}T00:00:00Z`;
  const rows = [];
  for (let page = maxPage; page >= 1; page -= 1) {
    const pageRows = await github(`/repos/${targetRepo}/stargazers?per_page=100&page=${page}`, {
      headers: { Accept: "application/vnd.github.star+json" }
    });
    if (!pageRows.length) break;
    rows.push(...pageRows.filter((item) => item?.starred_at && item.starred_at >= startTimestamp));
    const oldest = pageRows
      .map((item) => item?.starred_at)
      .filter(Boolean)
      .sort()[0];
    if (oldest && oldest < startTimestamp) break;
  }
  return rows;
}

function dailyRowsFromStargazers(stargazers, startDate, endDate) {
  const byDay = new Map();
  for (const item of stargazers) {
    const day = item.starred_at.slice(0, 10);
    byDay.set(day, (byDay.get(day) || 0) + 1);
  }
  return datesBetween(startDate, endDate)
    .map((date) => [date, byDay.get(date) || 0])
    .filter(([, count]) => count > 0);
}

function fallbackDailyCounts(existingRows, previousSnapshot, currentSnapshot) {
  const delta = currentSnapshot.stars - previousSnapshot.stars;
  if (delta > 0) {
    console.warn(
      `Leaving daily bars unchanged because detailed daily counts are unavailable; cumulative line will absorb ${delta} stars through snapshot alignment.`
    );
  }
  return existingRows;
}

function sumRange(rows, start, end) {
  return rows
    .filter(([date]) => date >= start && date <= end)
    .reduce((sum, [, count]) => sum + count, 0);
}

function detailedOffset(snapshot, rows) {
  return snapshot.stars - sumRange(rows, dailyCountsStartDate, snapshot.timelineEnd);
}

function assertDailyRowsReconcile(previousSnapshot, existingRows, currentSnapshot, dailyRows) {
  const previousOffset = detailedOffset(previousSnapshot, existingRows);
  const currentOffset = detailedOffset(currentSnapshot, dailyRows);
  if (currentOffset > previousOffset) {
    const missing = currentOffset - previousOffset;
    throw new Error(
      `Detailed stargazer rows do not reconcile with repo total. Expected offset ${previousOffset}, got ${currentOffset}; missing ${missing} stars from daily bars. Refusing to commit a total-only update.`
    );
  }
  if (currentOffset < previousOffset) {
    console.log(`Detailed stargazer rows backfilled ${previousOffset - currentOffset} previously missing stars.`);
  }
}

function updateIndex(html, snapshot, dailyRows, cacheVersion) {
  const august = sumRange(dailyRows, "2026-08-01", snapshot.timelineEnd);
  return html
    .replace(
      /GitHub 总量快照更新到 \d{4}-\d{2}-\d{2}(?: \d{2}:\d{2})?，当前公开 star 总量 [\d,]+，逐日趋势展示从 2025-12-31 到 \d{4}-\d{2}-\d{2}。/,
      `GitHub 总量快照更新到 ${snapshot.time}，当前公开 star 总量 ${formatNumber(snapshot.stars)}，逐日趋势展示从 2025-12-31 到 ${snapshot.timelineEnd}。`
    )
    .replace(
      /<span id="lastUpdatedBadge" class="live-status">[^<]*<\/span>/,
      `<span id="lastUpdatedBadge" class="live-status">上次更新 ${snapshot.time}</span>`
    )
    .replace(/\.\/styles\.css(?:\?v=[^"]*)?/g, `./styles.css?v=${cacheVersion}`)
    .replace(/\.\/app\.js(?:\?v=[^"]*)?/g, `./app.js?v=${cacheVersion}`);
}

async function main() {
  let app = readFileSync(appPath, "utf8");
  let index = readFileSync(indexPath, "utf8");
  const previousSnapshot = readConstObject(app, "snapshot");
  const existingRows = readConstArray(app, "nonZeroDailyCounts");
  const now = new Date();
  const currentUtcDate = utcDate(now);
  const currentUpdateTime = beijingMinute(now);

  const repo = await github(`/repos/${repoName}`);
  const currentSnapshot = {
    ...previousSnapshot,
    date: currentUtcDate,
    time: currentUpdateTime,
    timelineEnd: [currentUtcDate, previousSnapshot.timelineEnd].sort().at(-1),
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    watchers: repo.subscribers_count ?? previousSnapshot.watchers,
    pushedAt: repo.pushed_at?.slice(0, 10) || previousSnapshot.pushedAt,
    description: repo.description || previousSnapshot.description
  };

  let dailyRows;
  try {
    const stargazers = await stargazersSince(currentSnapshot.stars, dailyCountsStartDate);
    const latestStarDate = stargazers.map((item) => item.starred_at.slice(0, 10)).sort().at(-1);
    currentSnapshot.timelineEnd = [currentSnapshot.timelineEnd, latestStarDate || dailyCountsStartDate].sort().at(-1);
    dailyRows = dailyRowsFromStargazers(stargazers, dailyCountsStartDate, currentSnapshot.timelineEnd);
    assertDailyRowsReconcile(previousSnapshot, existingRows, currentSnapshot, dailyRows);
  } catch (error) {
    throw new Error(`Detailed stargazer update failed; refusing to commit partial snapshot: ${error.message}`);
  }

  const cacheVersion = process.env.VERSION || `${currentSnapshot.timelineEnd}-dashboard-update`;
  app = replaceSnapshot(app, currentSnapshot);
  app = replaceConstArray(app, "nonZeroDailyCounts", dailyRows);
  app = await updateBenchmarkRepos(app, currentSnapshot.date);
  index = updateIndex(index, currentSnapshot, dailyRows, cacheVersion);

  if (process.env.DRY_RUN === "1") {
    console.log(`Dry run: ${repoName}: ${formatNumber(currentSnapshot.stars)} stars through ${currentSnapshot.timelineEnd}`);
    console.log(`Dry run: ${dailyRows.length} non-zero daily rows`);
    return;
  }

  writeFileSync(appPath, app);
  writeFileSync(indexPath, index);
  console.log(`Updated ${repoName}: ${formatNumber(currentSnapshot.stars)} stars through ${currentSnapshot.timelineEnd}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
