import { readFileSync, writeFileSync } from "node:fs";
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
    nextRepos.push({
      ...repo,
      stars: info.stargazers_count,
      forks: info.forks_count,
      recentChange: info.stargazers_count - previousTotal,
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

async function stargazersSince(totalStars, startDate) {
  const maxPage = Math.ceil(totalStars / 100);
  const startTimestamp = `${startDate}T00:00:00Z`;
  const rows = [];
  for (let page = maxPage; page >= 1; page -= 1) {
    const pageRows = await github(`/repos/${repoName}/stargazers?per_page=100&page=${page}`, {
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
  const currentUtcDate = utcDate(new Date());

  const repo = await github(`/repos/${repoName}`);
  const currentSnapshot = {
    ...previousSnapshot,
    date: currentUtcDate,
    time: currentUtcDate,
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
  } catch (error) {
    console.warn(`Detailed stargazer fetch failed; preserving daily bars: ${error.message}`);
    dailyRows = fallbackDailyCounts(existingRows, previousSnapshot, currentSnapshot);
  }

  const cacheVersion = process.env.VERSION || `${currentSnapshot.timelineEnd}-dashboard-update`;
  app = replaceSnapshot(app, currentSnapshot);
  app = replaceConstArray(app, "nonZeroDailyCounts", dailyRows);
  app = await updateBenchmarkRepos(app, currentSnapshot.time);
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
