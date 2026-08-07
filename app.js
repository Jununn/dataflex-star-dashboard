const snapshot = {
  date: "2026-08-07",
  time: "2026-08-07",
  timelineEnd: "2026-08-07",
  stars: 1927,
  forks: 256,
  watchers: 151,
  createdAt: "2025-08-09",
  pushedAt: "2026-06-17",
  description:
    "Data-centric training framework for data selection, data mixture, and data reweighting."
};

const nonZeroDailyCounts = [
  ["2025-09-03", 1],
  ["2025-09-14", 1],
  ["2025-09-17", 1],
  ["2025-09-18", 1],
  ["2025-09-27", 1],
  ["2025-09-28", 7],
  ["2025-09-29", 7],
  ["2025-09-30", 1],
  ["2025-10-02", 1],
  ["2025-10-04", 1],
  ["2025-10-06", 1],
  ["2025-10-13", 3],
  ["2025-10-27", 2],
  ["2025-11-12", 1],
  ["2025-11-24", 1],
  ["2025-11-25", 1],
  ["2025-12-16", 1],
  ["2025-12-23", 1],
  ["2025-12-25", 6],
  ["2025-12-26", 3],
  ["2025-12-28", 1],
  ["2025-12-30", 30],
  ["2025-12-31", 1],
  ["2026-01-04", 2],
  ["2026-01-05", 2],
  ["2026-01-06", 1],
  ["2026-01-07", 1],
  ["2026-01-10", 2],
  ["2026-01-12", 2],
  ["2026-01-14", 5],
  ["2026-01-15", 3],
  ["2026-01-16", 1],
  ["2026-01-19", 1],
  ["2026-01-27", 1],
  ["2026-01-28", 1],
  ["2026-02-06", 1],
  ["2026-03-18", 1],
  ["2026-03-23", 1],
  ["2026-03-25", 2],
  ["2026-03-31", 2],
  ["2026-04-01", 2],
  ["2026-04-02", 1],
  ["2026-04-03", 21],
  ["2026-04-04", 13],
  ["2026-04-05", 2],
  ["2026-04-06", 2],
  ["2026-04-07", 4],
  ["2026-04-08", 5],
  ["2026-04-09", 8],
  ["2026-04-10", 3],
  ["2026-04-11", 18],
  ["2026-04-12", 10],
  ["2026-04-13", 5],
  ["2026-04-14", 5],
  ["2026-04-15", 14],
  ["2026-04-16", 16],
  ["2026-04-17", 8],
  ["2026-04-18", 7],
  ["2026-04-19", 3],
  ["2026-04-20", 26],
  ["2026-04-21", 50],
  ["2026-04-22", 21],
  ["2026-04-23", 14],
  ["2026-04-24", 17],
  ["2026-04-25", 12],
  ["2026-04-26", 21],
  ["2026-04-27", 17],
  ["2026-04-28", 21],
  ["2026-04-29", 19],
  ["2026-04-30", 12],
  ["2026-05-01", 7],
  ["2026-05-02", 14],
  ["2026-05-03", 16],
  ["2026-05-04", 12],
  ["2026-05-05", 11],
  ["2026-05-06", 14],
  ["2026-05-07", 13],
  ["2026-05-08", 8],
  ["2026-05-09", 12],
  ["2026-05-10", 7],
  ["2026-05-11", 8],
  ["2026-05-12", 10],
  ["2026-05-13", 14],
  ["2026-05-14", 11],
  ["2026-05-15", 11],
  ["2026-05-16", 9],
  ["2026-05-17", 8],
  ["2026-05-18", 12],
  ["2026-05-19", 9],
  ["2026-05-20", 7],
  ["2026-05-21", 7],
  ["2026-05-22", 15],
  ["2026-05-23", 11],
  ["2026-05-24", 8],
  ["2026-05-25", 12],
  ["2026-05-26", 15],
  ["2026-05-27", 9],
  ["2026-05-28", 16],
  ["2026-05-29", 14],
  ["2026-05-30", 9],
  ["2026-05-31", 9],
  ["2026-06-01", 15],
  ["2026-06-02", 14],
  ["2026-06-03", 12],
  ["2026-06-04", 12],
  ["2026-06-05", 15],
  ["2026-06-06", 11],
  ["2026-06-07", 14],
  ["2026-06-08", 16],
  ["2026-06-09", 13],
  ["2026-06-10", 15],
  ["2026-06-11", 15],
  ["2026-06-12", 14],
  ["2026-06-13", 10],
  ["2026-06-14", 11],
  ["2026-06-15", 10],
  ["2026-06-16", 7],
  ["2026-06-17", 15],
  ["2026-06-18", 14],
  ["2026-06-19", 18],
  ["2026-06-20", 9],
  ["2026-06-21", 15],
  ["2026-06-22", 8],
  ["2026-06-23", 15],
  ["2026-06-24", 15],
  ["2026-06-25", 12],
  ["2026-06-26", 17],
  ["2026-06-27", 16],
  ["2026-06-28", 37],
  ["2026-06-29", 20],
  ["2026-06-30", 15],
  ["2026-07-01", 18],
  ["2026-07-02", 15],
  ["2026-07-03", 10],
  ["2026-07-04", 14],
  ["2026-07-05", 18],
  ["2026-07-06", 21],
  ["2026-07-07", 16],
  ["2026-07-08", 11],
  ["2026-07-09", 14],
  ["2026-07-10", 13],
  ["2026-07-11", 16],
  ["2026-07-12", 15],
  ["2026-07-13", 18],
  ["2026-07-14", 20],
  ["2026-07-15", 19],
  ["2026-07-16", 16],
  ["2026-07-17", 18],
  ["2026-07-18", 27],
  ["2026-07-19", 10],
  ["2026-07-20", 28],
  ["2026-07-21", 24],
  ["2026-07-22", 7],
  ["2026-07-24", 14],
  ["2026-07-25", 27],
  ["2026-07-26", 20],
  ["2026-07-27", 22],
  ["2026-07-28", 18],
  ["2026-07-29", 14],
  ["2026-07-30", 20],
  ["2026-07-31", 30],
  ["2026-08-01", 14],
  ["2026-08-02", 20],
  ["2026-08-03", 12],
  ["2026-08-04", 17],
  ["2026-08-05", 22],
  ["2026-08-06", 21],
  ["2026-08-07", 4]
];

const phases = [
  {
    id: "seed",
    label: "9-11 月：首批关注",
    start: "2025-09-03",
    end: "2025-11-30",
    note: "仓库创建后逐步获得早期关注，9/28-9/29 出现 7、7 的小峰值，但整体仍是低频自然增长。"
  },
  {
    id: "release",
    label: "12 月：首次发布",
    start: "2025-12-01",
    end: "2025-12-31",
    note: "README 记录 2025-12-23 首次发布；12/30 单日 31 stars，是早期最大一次台阶。"
  },
  {
    id: "quiet",
    label: "1-3 月：低位蓄水",
    start: "2026-01-01",
    end: "2026-03-31",
    note: "1 月仍有少量新增，2 月和 3 月前半段趋冷；3/17 技术更新后，3 月末开始重新有连续新增。"
  },
  {
    id: "paper",
    label: "4/1-4/10：论文传播启动",
    start: "2026-04-01",
    end: "2026-04-10",
    note: "4/3 论文发布和 4/4 Hugging Face Daily Papers #1 后，4/3、4/4 分别新增 21、13。"
  },
  {
    id: "amplify",
    label: "4/11-4/30：内容矩阵放大",
    start: "2026-04-11",
    end: "2026-04-30",
    note: "机器之心、Datawhale 等中文内容节点叠加，4/21 到达 50 stars 的单日峰值。"
  },
  {
    id: "steady",
    label: "5 月至今：稳定扩散",
    start: "2026-05-01",
    end: "2026-08-07",
    note: "5 月日增大多稳定在 7-16 区间；6 月下旬和 7 月下旬各有一次抬升，6/28、7/31 分别到达 37、30 stars。8 月初仍保持稳定新增。6/13 后逐日数据改用 Trendshift 活动流补齐，8/5-8/7 使用 GitHub 总量差补齐，顶部总量仍以 GitHub 当前公开计数为准。"
  }
];

const actions = [
  ["2025-12-23", "Release", "DataFlex 首次公开发布", "https://github.com/OpenDCAI/DataFlex"],
  ["2026-03-17", "README", "支持 DeepSpeed ZeRO-3 训练与分析", "https://github.com/OpenDCAI/DataFlex#-1-news"],
  ["2026-04-03", "X", "DataFlex 论文发布", "https://x.com/PKU_DCAI/status/2040003575687131238"],
  ["2026-04-04", "Hugging Face", "技术报告登上 Daily Papers 当日 #1", "https://huggingface.co/papers/2603.26164"],
  ["2026-04-15", "公众号", "机器之心 - DataFlex", "https://mp.weixin.qq.com/s/QoXfElsL0UL8kAk_ThfYcw"],
  ["2026-04-20", "公众号", "Datawhale - DataFlex", "https://mp.weixin.qq.com/s/tGj9PZTHhmdo_w0ChW-O4Q"],
  ["2026-05-26", "公众号", "数科星球 - 深度拆解 DataFlow 和 DataFlex", "#"]
].map(([date, channel, title, url]) => ({ date, channel, title, url }));

const benchmarkRepos = [
  {
    name: "hiyouga/LlamaFactory",
    stars: 73760,
    forks: 9022,
    color: "#2563eb",
    note: "DataFlex 的训练底座生态参照。"
  },
  {
    name: "OpenDCAI/DataFlow",
    stars: 7197,
    forks: 981,
    color: "#16a34a",
    note: "DataFlex 上游数据准备搭档。"
  },
  {
    name: "OpenDCAI/DataFlex",
    stars: 1927,
    forks: 256,
    color: "#e3a008",
    note: "当前看板目标仓库。"
  },
  {
    name: "princeton-nlp/LESS",
    stars: 532,
    forks: 47,
    color: "#dc2626",
    note: "Influential data selection 代表项目。"
  },
  {
    name: "sangmichaelxie/doremi",
    stars: 357,
    forks: 35,
    color: "#7c3aed",
    note: "Data mixture 权重优化代表实现。"
  },
  {
    name: "ZifanL/TSDS",
    stars: 19,
    forks: 2,
    color: "#0f766e",
    note: "Task-specific data selection 实现。"
  },
  {
    name: "alon-albalak/online-data-mixing",
    stars: 14,
    forks: 5,
    color: "#f97316",
    note: "Online data mixing 相关实现。"
  }
];

const byDateActions = actions.reduce((acc, action) => {
  (acc[action.date] ||= []).push(action);
  return acc;
}, {});

function buildDailyCounts(start, end, nonZeroRows) {
  const counts = new Map(nonZeroRows);
  const rows = [];
  const cursor = new Date(`${start}T00:00:00Z`);
  const last = new Date(`${end}T00:00:00Z`);
  while (cursor <= last) {
    const date = cursor.toISOString().slice(0, 10);
    rows.push([date, counts.get(date) || 0]);
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return rows;
}

const chartStartDate = "2025-12-31";
const dailyCounts = buildDailyCounts("2025-09-03", snapshot.timelineEnd, nonZeroDailyCounts);
const data = dailyCounts.map(([date, stars], index) => {
  const cumulative = dailyCounts.slice(0, index + 1).reduce((sum, item) => sum + item[1], 0);
  return {
    date,
    stars,
    cumulative,
    phase: phases.find((phase) => date >= phase.start && date <= phase.end),
    actions: byDateActions[date] || []
  };
});
const chartData = data.filter((item) => item.date >= chartStartDate);

let calendarMonth = dailyCounts.at(-1)[0].slice(0, 7);

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function addMonths(month, delta) {
  const [year, monthIndex] = month.split("-").map(Number);
  const date = new Date(Date.UTC(year, monthIndex - 1 + delta, 1));
  return date.toISOString().slice(0, 7);
}

function getMonthBounds(month) {
  const [year, monthIndex] = month.split("-").map(Number);
  const start = new Date(Date.UTC(year, monthIndex - 1, 1));
  const end = new Date(Date.UTC(year, monthIndex, 0));
  return {
    start,
    end,
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10)
  };
}

function getChannelClass(channel) {
  const normalized = channel.toLowerCase();
  if (normalized.includes("hugging")) return "channel-hf";
  if (channel.includes("公众号")) return "channel-wechat";
  if (channel.includes("Release")) return "channel-release";
  if (channel.includes("README")) return "channel-docs";
  if (channel.includes("X")) return "channel-social";
  return "channel-default";
}

function sumRange(start, end) {
  return data
    .filter((item) => item.date >= start && item.date <= end)
    .reduce((sum, item) => sum + item.stars, 0);
}

function monthAverageLabel(month) {
  const rows = data.filter((item) => item.date.startsWith(month));
  const total = rows.reduce((sum, item) => sum + item.stars, 0);
  const average = rows.length ? total / rows.length : 0;
  return `${Number(month.slice(5))} 月 (${average.toFixed(1)}/d)`;
}

function buildTrendBands() {
  const bands = [
    { start: "2025-09-03", end: "2025-11-30", label: "9-11 月" },
    { start: "2025-12-01", end: "2025-12-31", label: "12 月" },
    { start: "2026-01-01", end: "2026-03-31", label: "1-3 月" }
  ];
  let month = "2026-04";
  const lastMonth = snapshot.timelineEnd.slice(0, 7);
  while (month <= lastMonth) {
    const bounds = getMonthBounds(month);
    bands.push({
      start: bounds.startDate,
      end: bounds.endDate < snapshot.timelineEnd ? bounds.endDate : snapshot.timelineEnd,
      label: monthAverageLabel(month)
    });
    month = addMonths(month, 1);
  }
  return bands;
}

function renderSummary() {
  const maxDay = data.reduce((max, item) => (item.stars > max.stars ? item : max), data[0]);
  const august = sumRange("2026-08-01", snapshot.timelineEnd);
  const lastSeven = data.slice(-7).reduce((sum, item) => sum + item.stars, 0);
  const cards = [
    ["当前 stars", formatNumber(snapshot.stars), `${snapshot.time} GitHub API 快照；forks ${snapshot.forks}，watchers ${snapshot.watchers}。`],
    ["8 月新增", formatNumber(august), `8/1 到 ${snapshot.timelineEnd}；最近 7 天仍有 ${formatNumber(lastSeven)} stars。`],
    ["最高单日", `${maxDay.stars}`, `${maxDay.date}，位于 4 月内容矩阵放大阶段。`]
  ];
  document.getElementById("summary").innerHTML = cards
    .map(([label, value, note]) => `<article class="metric"><span>${label}</span><strong>${value}</strong><p>${note}</p></article>`)
    .join("");
}

function renderTrendChart() {
  const width = Math.max(1120, chartData.length * 5.2);
  const height = 360;
  const margin = { top: 28, right: 66, bottom: 46, left: 70 };
  const chartW = width - margin.left - margin.right;
  const chartH = height - margin.top - margin.bottom;
  const maxStars = Math.max(55, ...chartData.map((item) => item.stars));
  const maxCum = chartData.at(-1).cumulative;
  const x = (i) => margin.left + (i / (chartData.length - 1)) * chartW;
  const barW = Math.max(3, chartW / chartData.length - 2);
  const yStars = (v) => margin.top + chartH - (v / maxStars) * chartH;
  const yCum = (v) => margin.top + chartH - (v / maxCum) * chartH;
  const gridTicks = [0, 10, 20, 30, 40, 50];
  const grid = gridTicks
    .map((tick) => `<line class="grid-line" x1="${margin.left}" y1="${yStars(tick)}" x2="${width - margin.right}" y2="${yStars(tick)}"></line><text class="chart-label" x="16" y="${yStars(tick) + 4}">${tick}</text>`)
    .join("");
  const bands = buildTrendBands()
    .map((phase) => {
      const startIndex = data.findIndex((item) => item.date === phase.start);
      const endIndex = data.findIndex((item) => item.date === phase.end);
      if (startIndex < 0 || endIndex < 0) return "";
      const chartStartIndex = chartData.findIndex((item) => item.date === phase.start);
      const chartEndIndex = chartData.findIndex((item) => item.date === phase.end);
      if (chartStartIndex < 0 || chartEndIndex < 0) return "";
      const bx = x(chartStartIndex) - barW / 2;
      const bw = x(chartEndIndex) - x(chartStartIndex) + barW;
      return `<rect class="phase-band" x="${bx}" y="${margin.top}" width="${bw}" height="${chartH}" opacity="0.55"></rect>
        <text class="phase-label" x="${bx + 8}" y="${margin.top + 18}">${phase.label}</text>`;
    })
    .join("");
  const bars = chartData
    .map((item, i) => {
      const bx = x(i) - barW / 2;
      const by = yStars(item.stars);
      const cls = item.stars >= 50 ? "bar hot" : "bar";
      return `<rect class="${cls}" x="${bx}" y="${by}" width="${barW}" height="${margin.top + chartH - by}" rx="2"></rect>`;
    })
    .join("");
  const line = chartData.map((item, i) => `${x(i)},${yCum(item.cumulative)}`).join(" ");
  const pins = chartData
    .filter((item) => item.actions.length)
    .map((item) => {
      const i = chartData.indexOf(item);
      return `<circle class="action-pin" cx="${x(i)}" cy="${yStars(Math.max(item.stars, 2)) - 9}" r="4"><title>${item.date}: ${item.actions.map((a) => a.title).join(" / ")}</title></circle>`;
    })
    .join("");
  const monthLabels = chartData
    .filter((item) => item.date === chartData[0].date || (item.date.endsWith("-01") && item.date !== "2026-01-01"))
    .map((item) => {
      const i = chartData.indexOf(item);
      return `<text class="chart-label" x="${x(i) - 18}" y="${height - 24}">${item.date.slice(5)}</text>`;
    })
    .join("");
  const hoverZones = chartData
    .map((item, i) => {
      const zoneW = Math.max(7, chartW / chartData.length);
      return `<rect class="hover-zone" x="${x(i) - zoneW / 2}" y="${margin.top}" width="${zoneW}" height="${chartH}" data-date="${item.date}" data-stars="${item.stars}" data-cumulative="${item.cumulative}"></rect>`;
    })
    .join("");
  document.getElementById("mainChart").innerHTML = `
    <div id="chartTooltip" class="chart-tooltip" hidden></div>
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Daily stars and cumulative stars">
      ${bands}
      ${grid}
      ${bars}
      <polyline class="cum-line" points="${line}"></polyline>
      ${pins}
      ${hoverZones}
      <line x1="${margin.left}" y1="${margin.top + chartH}" x2="${width - margin.right}" y2="${margin.top + chartH}" stroke="#cbd5e1"></line>
      ${monthLabels}
      <text class="chart-label" x="${width - margin.right + 8}" y="${yCum(maxCum) + 4}">${formatNumber(maxCum)}</text>
      <text class="axis-title" x="${margin.left - 52}" y="${margin.top - 10}">Daily stars</text>
    </svg>`;
  bindChartTooltip();
}

function bindChartTooltip() {
  const wrap = document.getElementById("mainChart");
  const tooltip = document.getElementById("chartTooltip");
  wrap.querySelectorAll(".hover-zone").forEach((zone) => {
    zone.addEventListener("mousemove", (event) => {
      const rect = wrap.getBoundingClientRect();
      tooltip.hidden = false;
      tooltip.style.left = `${event.clientX - rect.left + wrap.scrollLeft}px`;
      tooltip.style.top = `${event.clientY - rect.top + wrap.scrollTop}px`;
      tooltip.innerHTML = `<strong>${zone.dataset.date}</strong><span>新增 stars：${zone.dataset.stars}</span><span>累计 stars：${formatNumber(Number(zone.dataset.cumulative))}</span>`;
    });
    zone.addEventListener("mouseleave", () => {
      tooltip.hidden = true;
    });
  });
}

function renderMonthlyChart() {
  const months = data.reduce((acc, item) => {
    const month = item.date.slice(0, 7);
    acc[month] = (acc[month] || 0) + item.stars;
    return acc;
  }, {});
  const entries = Object.entries(months);
  const width = 620;
  const height = 230;
  const margin = { top: 18, right: 18, bottom: 42, left: 42 };
  const chartW = width - margin.left - margin.right;
  const chartH = height - margin.top - margin.bottom;
  const max = Math.max(...entries.map(([, value]) => value));
  const barW = chartW / entries.length - 15;
  const bars = entries
    .map(([month, value], index) => {
      const x = margin.left + index * (chartW / entries.length) + 8;
      const h = (value / max) * chartH;
      const y = margin.top + chartH - h;
      return `<rect class="bar" x="${x}" y="${y}" width="${barW}" height="${h}" rx="4"></rect>
        <text class="chart-label" x="${x}" y="${y - 6}">${value}</text>
        <text class="chart-label" x="${x - 4}" y="${height - 18}">${month.slice(5)}</text>`;
    })
    .join("");
  document.getElementById("monthlyChart").innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Monthly added stars">
      <line class="grid-line" x1="${margin.left}" y1="${margin.top}" x2="${width - margin.right}" y2="${margin.top}"></line>
      <line x1="${margin.left}" y1="${margin.top + chartH}" x2="${width - margin.right}" y2="${margin.top + chartH}" stroke="#cbd5e1"></line>
      ${bars}
    </svg>`;
}

function renderMomentum() {
  const last7 = data.slice(-7).reduce((sum, item) => sum + item.stars, 0);
  const prev7 = data.slice(-14, -7).reduce((sum, item) => sum + item.stars, 0);
  const aprPeak = sumRange("2026-04-20", "2026-04-26");
  const cards = [
    ["最近 7 天", `${last7}`, `前 7 天 ${prev7}，变化 ${last7 - prev7 >= 0 ? "+" : ""}${last7 - prev7}`],
    ["4/20-4/26", `${aprPeak}`, "包含 4/21 单日峰值 50"],
    ["4/3 后新增", `${sumRange("2026-04-03", snapshot.date)}`, "论文传播启动后的累计新增"],
    ["5 月日均", `${(sumRange("2026-05-01", "2026-05-31") / 31).toFixed(1)}`, "稳定扩散阶段基线"]
  ];
  document.getElementById("momentumGrid").innerHTML = cards
    .map(([label, value, note]) => `<article class="momentum-card"><span>${label}</span><strong>${value}</strong><span>${note}</span></article>`)
    .join("");
}

function renderPhaseCards() {
  document.getElementById("phaseCards").innerHTML = phases
    .map((phase) => {
      const items = data.filter((item) => item.phase?.id === phase.id);
      const total = items.reduce((sum, item) => sum + item.stars, 0);
      const avg = total / items.length;
      const max = items.reduce((best, item) => (item.stars > best.stars ? item : best), items[0]);
      return `<article class="phase-card">
        <strong>${phase.label}</strong>
        <p>${phase.start} 至 ${phase.end}，新增 ${total} stars，日均 ${avg.toFixed(1)}，最高 ${max.date} / ${max.stars}。${phase.note}</p>
      </article>`;
    })
    .join("");
}

function renderBenchmark() {
  const sorted = benchmarkRepos.slice().sort((a, b) => b.stars - a.stars);
  const dataFlex = sorted.find((repo) => repo.name === "OpenDCAI/DataFlex");
  document.getElementById("benchmarkCards").innerHTML = sorted
    .map((repo, index) => {
      const ratio = dataFlex && repo.name !== dataFlex.name ? repo.stars / dataFlex.stars : 1;
      const ratioText = repo.name === dataFlex?.name ? "目标仓库" : `${ratio.toFixed(ratio >= 10 ? 0 : 1)}x DataFlex`;
      return `<a class="benchmark-card${repo.name === "OpenDCAI/DataFlex" ? " is-target" : ""}" href="https://github.com/${repo.name}" target="_blank" rel="noreferrer">
      <i style="background:${repo.color}"></i>
      <span class="benchmark-rank">#${index + 1}</span>
      <strong>${repo.name}</strong>
      <em>${formatNumber(repo.stars)}</em>
      <small>${ratioText} · forks ${formatNumber(repo.forks)}</small>
      <b>${repo.note}</b>
    </a>`;
    })
    .join("");

  const width = 1180;
  const rowH = 46;
  const height = sorted.length * rowH + 58;
  const margin = { top: 20, right: 210, bottom: 28, left: 252 };
  const max = Math.sqrt(sorted[0].stars);
  const chartW = width - margin.left - margin.right;
  const bars = sorted
    .map((repo, index) => {
      const y = margin.top + index * rowH;
      const w = (Math.sqrt(repo.stars) / max) * chartW;
      const target = repo.name === "OpenDCAI/DataFlex";
      const label = target ? "benchmark-label is-target" : "benchmark-label";
      const ratio = dataFlex && !target ? repo.stars / dataFlex.stars : 1;
      const ratioText = target ? "target" : `${ratio.toFixed(ratio >= 10 ? 0 : 1)}x`;
      return `<text class="${label}" x="24" y="${y + 25}">${repo.name}</text>
        <rect class="benchmark-track" x="${margin.left}" y="${y + 10}" width="${chartW}" height="16" rx="5"></rect>
        <rect class="benchmark-bar" x="${margin.left}" y="${y + 10}" width="${w}" height="16" rx="5" fill="${repo.color}"></rect>
        <text class="benchmark-value" x="${margin.left + w + 10}" y="${y + 23}">${formatNumber(repo.stars)}</text>
        <text class="benchmark-meta" x="${width - 132}" y="${y + 23}">${ratioText} · ${formatNumber(repo.forks)} forks</text>`;
    })
    .join("");
  document.getElementById("benchmarkChart").innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Related repository star benchmark">
      ${bars}
      <text class="chart-label" x="${margin.left}" y="${height - 10}">Square-root scale · snapshot ${snapshot.date}</text>
    </svg>`;
}

function renderTable(filter = "all") {
  const rows = data
    .filter((item) => filter === "all" || item.phase?.id === filter)
    .slice()
    .reverse()
    .map((item) => {
      const actionsHtml = item.actions.length
        ? `<div class="tag-list">${item.actions
            .map((action) => `<span class="tag">${action.channel}</span><a class="action-link" href="${action.url}" target="_blank" rel="noreferrer">${action.title}</a>`)
            .join("")}</div>`
        : `<span class="tag">未记录公开节点</span>`;
      const countClass = item.stars >= 20 ? "count-hot" : "";
      return `<tr>
        <td>${item.date}</td>
        <td class="${countClass}">${item.stars}</td>
        <td>${formatNumber(item.cumulative)}</td>
        <td>${item.phase?.label || "未分组"}</td>
        <td>${actionsHtml}</td>
      </tr>`;
    })
    .join("");
  document.getElementById("dailyTable").innerHTML = rows;
}

function renderActionCalendar() {
  const calendar = document.getElementById("actionCalendar");
  const monthLabel = document.getElementById("calendarMonthLabel");
  if (!calendar || !monthLabel) return;

  const { start, end, startDate, endDate } = getMonthBounds(calendarMonth);
  const firstOffset = start.getUTCDay();
  const daysInMonth = end.getUTCDate();
  const rowsByDate = new Map(data.map((item) => [item.date, item]));
  const cells = [];
  const totalCells = Math.ceil((firstOffset + daysInMonth) / 7) * 7;
  const weekdays = ["日", "一", "二", "三", "四", "五", "六"];

  for (let index = 0; index < totalCells; index += 1) {
    const day = index - firstOffset + 1;
    if (day < 1 || day > daysInMonth) {
      cells.push(`<div class="calendar-cell is-empty"></div>`);
      continue;
    }

    const date = `${calendarMonth}-${String(day).padStart(2, "0")}`;
    const item = rowsByDate.get(date);
    const actions = item?.actions || [];
    const isWeekend = index % 7 === 0 || index % 7 === 6;
    const stars = item?.stars ?? 0;
    const countClass = stars >= 20 ? "count-hot" : "";
    const actionsHtml = actions.length
      ? actions
          .map(
            (action) =>
              `<a class="calendar-action ${getChannelClass(action.channel)}" href="${escapeHtml(action.url)}" target="_blank" rel="noreferrer" title="${escapeHtml(`${date} · ${action.channel} · ${action.title}`)}" data-date="${date}" data-channel="${escapeHtml(action.channel)}" data-title="${escapeHtml(action.title)}" data-url="${escapeHtml(action.url)}"><span>${escapeHtml(action.channel)}</span>${escapeHtml(action.title)}</a>`
          )
          .join("")
      : "";

    cells.push(`<article class="calendar-cell${isWeekend ? " is-weekend" : ""}">
      <div class="calendar-date">
        <strong>${day}</strong>
      </div>
      <div class="calendar-metrics">
        <span class="${countClass}">+${stars}</span>
        <em>${item ? formatNumber(item.cumulative) : "-"}</em>
      </div>
      <div class="calendar-actions">${actionsHtml}</div>
    </article>`);
  }

  monthLabel.textContent = `${calendarMonth.replace("-", " 年 ")} 月`;
  calendar.innerHTML = `
    <div id="calendarTooltip" class="chart-tooltip calendar-tooltip" hidden></div>
    <div class="calendar-weekdays">${weekdays.map((day) => `<span>${day}</span>`).join("")}</div>
    <div class="calendar-grid">${cells.join("")}</div>`;
  bindCalendarActionTooltip();

  const minMonth = data[0].date.slice(0, 7);
  const maxMonth = data.at(-1).date.slice(0, 7);
  document.getElementById("calendarPrev").disabled = startDate.slice(0, 7) <= minMonth;
  document.getElementById("calendarNext").disabled = endDate.slice(0, 7) >= maxMonth;
}

function bindCalendarActionTooltip() {
  const wrap = document.getElementById("actionCalendar");
  const tooltip = document.getElementById("calendarTooltip");
  if (!wrap || !tooltip) return;

  wrap.querySelectorAll(".calendar-action").forEach((action) => {
    action.addEventListener("click", (event) => {
      const url = action.dataset.url;
      if (!url || url === "#") return;
      event.preventDefault();
      window.open(url, "_blank", "noopener,noreferrer");
    });
    action.addEventListener("mousemove", (event) => {
      const rect = wrap.getBoundingClientRect();
      tooltip.hidden = false;
      tooltip.style.left = `${event.clientX - rect.left + wrap.scrollLeft}px`;
      tooltip.style.top = `${event.clientY - rect.top + wrap.scrollTop}px`;
      tooltip.innerHTML = `<strong>${action.dataset.title}</strong><span>日期：${action.dataset.date}</span><span>渠道：${action.dataset.channel}</span><span>${action.dataset.url}</span>`;
    });
    action.addEventListener("mouseleave", () => {
      tooltip.hidden = true;
    });
  });
}

function initCalendar() {
  document.getElementById("calendarPrev")?.addEventListener("click", () => {
    calendarMonth = addMonths(calendarMonth, -1);
    renderActionCalendar();
  });
  document.getElementById("calendarNext")?.addEventListener("click", () => {
    calendarMonth = addMonths(calendarMonth, 1);
    renderActionCalendar();
  });
}

function initFilter() {
  const select = document.getElementById("phaseFilter");
  if (!select) return;
  phases.forEach((phase) => {
    const option = document.createElement("option");
    option.value = phase.id;
    option.textContent = phase.label;
    select.append(option);
  });
  select.addEventListener("change", () => renderTable(select.value));
}

renderSummary();
renderTrendChart();
renderMonthlyChart();
renderMomentum();
renderPhaseCards();
renderBenchmark();
initFilter();
initCalendar();
renderActionCalendar();
