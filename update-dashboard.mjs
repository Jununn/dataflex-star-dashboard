import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const appPath = join(root, "app.js");
const indexPath = join(root, "index.html");
const repoName = "OpenDCAI/DataFlex";
const dailyCountsStartDate = "2025-09-03";

function utcDate(date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date, delta) {
  const cursor = new Date(`${date}T00:00:00Z`);
  cursor.setUTCDate(cursor.getUTCDate() + delta);
  return utcDate(cursor);
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
    const recentHistory = await starHistoryRowsSince(yesterday, repo.name);
    const yesterdayChange = recentHistory.find(([date]) => date === yesterday)?.[1] || 0;
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
  const publicHeaders = {
    "User-Agent": "dataflex-dashboard-updater",
    ...(options.headers || {})
  };
  const authenticatedHeaders = token
    ? { ...publicHeaders, Authorization: `Bearer ${token}` }
    : publicHeaders;
  const url = `https://api.github.com${path}`;

  async function request(headers) {
    try {
      return await fetch(url, { ...options, headers });
    } catch {
      return curlJson(url, { method: options.method || "GET", headers, body: options.body, path });
    }
  }

  let res;
  try {
    res = await request(authenticatedHeaders);
  } catch (error) {
    if (!token) throw error;
    console.warn(`Authenticated GitHub request failed for ${path}; retrying anonymously.`);
    res = await request(publicHeaders);
  }
  if (!(res instanceof Response)) return res;
  if (res.status === 403 && token) {
    console.warn(`Authenticated GitHub rate limit reached for ${path}; retrying anonymously.`);
    res = await request(publicHeaders);
    if (!(res instanceof Response)) return res;
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
  if (process.env.GITHUB_NO_AUTH === "1") return "";
  return process.env.GH_TOKEN || process.env.GITHUB_TOKEN || readGhToken();
}

async function starHistoryRowsSince(startDate, targetRepo = repoName) {
  const rows = new Map();
  for (let page = 1; page <= 100; page += 1) {
    const weeks = await github(`/repos/${targetRepo}/stargazers/history?per_page=30&page=${page}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2026-03-10"
      }
    });
    if (!Array.isArray(weeks) || !weeks.length) break;

    let reachedStart = false;
    for (const week of weeks) {
      const weekStart = utcDate(new Date(week.week * 1000));
      (week.days || []).forEach((count, index) => {
        const date = addDays(weekStart, index);
        if (date >= startDate) rows.set(date, count);
      });
      if (addDays(weekStart, 6) < startDate) reachedStart = true;
    }
    if (reachedStart || weeks.length < 30) break;
  }
  return [...rows.entries()].sort(([a], [b]) => a.localeCompare(b));
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

function alignCurrentDayWithSnapshot(previousSnapshot, existingRows, currentSnapshot, dailyRows) {
  const previousOffset = detailedOffset(previousSnapshot, existingRows);
  const currentOffset = detailedOffset(currentSnapshot, dailyRows);
  const missing = currentOffset - previousOffset;
  if (missing <= 0) return dailyRows;
  if (missing > 5) {
    throw new Error(`Star history is missing ${missing} stars; refusing to assign a large API lag to the current day.`);
  }

  const rows = dailyRows.map((row) => [...row]);
  const currentRow = rows.find(([date]) => date === currentSnapshot.timelineEnd);
  if (currentRow) currentRow[1] += missing;
  else rows.push([currentSnapshot.timelineEnd, missing]);
  console.log(`Assigned ${missing} delayed star-history count to ${currentSnapshot.timelineEnd}.`);
  return rows.sort(([a], [b]) => a.localeCompare(b));
}

function updateIndex(html, snapshot, dailyRows, cacheVersion) {
  const august = sumRange(dailyRows, "2026-08-01", snapshot.timelineEnd);
  return html
    .replace(
      /GitHub 总量快照更新到 \d{4}-\d{2}-\d{2}(?: \d{2}:\d{2})?，当前公开 star 总量 [\d,]+，逐日趋势展示从 \d{4}-\d{2}-\d{2} 到 \d{4}-\d{2}-\d{2}。/,
      `GitHub 总量快照更新到 ${snapshot.time}，当前公开 star 总量 ${formatNumber(snapshot.stars)}，逐日趋势展示从 ${dailyCountsStartDate} 到 ${snapshot.timelineEnd}。`
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
    const historyRows = await starHistoryRowsSince(dailyCountsStartDate);
    const latestStarDate = historyRows.filter(([, count]) => count > 0).map(([date]) => date).at(-1);
    currentSnapshot.timelineEnd = [currentSnapshot.timelineEnd, latestStarDate || dailyCountsStartDate].sort().at(-1);
    dailyRows = historyRows.filter(([date, count]) => date <= currentSnapshot.timelineEnd && count > 0);
    dailyRows = alignCurrentDayWithSnapshot(previousSnapshot, existingRows, currentSnapshot, dailyRows);
    assertDailyRowsReconcile(previousSnapshot, existingRows, currentSnapshot, dailyRows);
  } catch (error) {
    throw new Error(`Detailed stargazer update failed; refusing to commit partial snapshot: ${error.message}`);
  }

  const cacheVersion = process.env.VERSION || `${currentSnapshot.timelineEnd}-dashboard-update`;
  app = replaceSnapshot(app, currentSnapshot);
  app = replaceConstArray(app, "nonZeroDailyCounts", dailyRows);
  if (process.env.SKIP_BENCHMARKS !== "1") {
    app = await updateBenchmarkRepos(app, currentSnapshot.date);
  }
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
