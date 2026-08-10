import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const appPath = join(root, "app.js");
const indexPath = join(root, "index.html");
const repoName = "OpenDCAI/DataFlex";
const recalculationWindowDays = 7;

function utcDate(date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date, days) {
  const next = new Date(`${date}T00:00:00Z`);
  next.setUTCDate(next.getUTCDate() + days);
  return utcDate(next);
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
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

function updateBenchmarkTarget(source, snapshot) {
  return source.replace(
    /(name: "OpenDCAI\/DataFlex",\n\s+stars: )\d+(,\n\s+forks: )\d+/,
    `$1${snapshot.stars}$2${snapshot.forks}`
  );
}

async function github(path, options = {}) {
  const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
  const res = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      "User-Agent": "dataflex-dashboard-updater",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub API ${res.status} for ${path}: ${body.slice(0, 240)}`);
  }
  return res.json();
}

async function recentDailyCounts(totalStars, startDate, endDate) {
  const counts = new Map();
  const maxPage = Math.ceil(totalStars / 100);
  for (let page = maxPage; page >= 1; page -= 1) {
    const rows = await github(`/repos/${repoName}/stargazers?per_page=100&page=${page}`, {
      headers: { Accept: "application/vnd.github.star+json" }
    });
    if (!rows.length) break;

    let shouldStop = false;
    for (const row of rows) {
      const date = row.starred_at?.slice(0, 10);
      if (!date) continue;
      if (date >= startDate && date <= endDate) {
        counts.set(date, (counts.get(date) || 0) + 1);
      }
      if (date < startDate) shouldStop = true;
    }
    if (shouldStop) break;
  }
  return counts;
}

function mergeDailyCounts(existingRows, freshCounts, startDate, endDate) {
  const merged = new Map(existingRows);
  for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
    merged.delete(date);
    const count = freshCounts.get(date) || 0;
    if (count > 0) merged.set(date, count);
  }
  return [...merged.entries()].sort(([a], [b]) => a.localeCompare(b));
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

function updateIndex(html, snapshot, dailyRows, cacheVersion) {
  const august = sumRange(dailyRows, "2026-08-01", snapshot.timelineEnd);
  return html
    .replace(
      /GitHub 总量快照更新到 \d{4}-\d{2}-\d{2}，当前公开 star 总量 [\d,]+，逐日趋势展示从 2025-12-31 到 \d{4}-\d{2}-\d{2}。/,
      `GitHub 总量快照更新到 ${snapshot.time}，当前公开 star 总量 ${formatNumber(snapshot.stars)}，逐日趋势展示从 2025-12-31 到 ${snapshot.timelineEnd}。`
    )
    .replace(/窗口：2026-08-01 到 \d{4}-\d{2}-\d{2}/g, `窗口：2026-08-01 到 ${snapshot.timelineEnd}`)
    .replace(/8 月新增 stargazer：[\d,]+/g, `8 月新增 stargazer：${formatNumber(august)}`)
    .replace(/已抓取 starred repos：0 \/ [\d,]+/g, `已抓取 starred repos：0 / ${formatNumber(august)}`)
    .replace(/能确认 8 月窗口内新增 [\d,]+ 个用户/g, `能确认 8 月窗口内新增 ${formatNumber(august)} 个用户`)
    .replace(/\.\/app\.js(?:\?v=[^"]*)?/g, `./app.js?v=${cacheVersion}`);
}

async function main() {
  let app = readFileSync(appPath, "utf8");
  let index = readFileSync(indexPath, "utf8");
  const previousSnapshot = readConstObject(app, "snapshot");
  const existingRows = readConstArray(app, "nonZeroDailyCounts");
  const endDate = utcDate(new Date());
  const previousLastDate = existingRows.at(-1)?.[0] || previousSnapshot.timelineEnd;
  const recalculationStart = addDays(previousLastDate, -recalculationWindowDays + 1);

  const repo = await github(`/repos/${repoName}`);
  const currentSnapshot = {
    ...previousSnapshot,
    date: endDate,
    time: endDate,
    timelineEnd: endDate,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    watchers: repo.subscribers_count ?? previousSnapshot.watchers,
    pushedAt: repo.pushed_at?.slice(0, 10) || previousSnapshot.pushedAt,
    description: repo.description || previousSnapshot.description
  };

  let dailyRows;
  try {
    const freshCounts = await recentDailyCounts(currentSnapshot.stars, recalculationStart, endDate);
    dailyRows = mergeDailyCounts(existingRows, freshCounts, recalculationStart, endDate);
  } catch (error) {
    console.warn(`Detailed stargazer fetch failed; preserving daily bars: ${error.message}`);
    dailyRows = fallbackDailyCounts(existingRows, previousSnapshot, currentSnapshot);
  }

  const cacheVersion = process.env.VERSION || `${endDate}-dashboard-update`;
  app = replaceSnapshot(app, currentSnapshot);
  app = replaceConstArray(app, "nonZeroDailyCounts", dailyRows);
  app = updateBenchmarkTarget(app, currentSnapshot);
  index = updateIndex(index, currentSnapshot, dailyRows, cacheVersion);

  if (process.env.DRY_RUN === "1") {
    console.log(`Dry run: ${repoName}: ${formatNumber(currentSnapshot.stars)} stars through ${endDate}`);
    console.log(`Dry run: ${dailyRows.length} non-zero daily rows`);
    return;
  }

  writeFileSync(appPath, app);
  writeFileSync(indexPath, index);
  console.log(`Updated ${repoName}: ${formatNumber(currentSnapshot.stars)} stars through ${endDate}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
