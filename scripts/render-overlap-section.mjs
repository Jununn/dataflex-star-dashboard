import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const indexPath = path.join(root, "index.html");
const dataPath = path.join(root, "data/dataflex-overlap.json");
const month = process.env.MONTH || "2026-08";
const monthLabel = month.slice(5).replace(/^0/, "");
const endDate = process.env.END_DATE || "2026-08-31";
const overlap = JSON.parse(fs.readFileSync(dataPath, "utf8")).months[month];

if (!overlap) {
  throw new Error(`Missing overlap data for ${month}`);
}

function fmt(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function pct(value) {
  return `${Math.round(value * 100)}%`;
}

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function relationClass(relation) {
  if (relation === "上游搭档") return "complement";
  if (relation === "典型相关") return "downstream";
  if (relation === "场景相邻") return "adjacent";
  return "weak";
}

const topRows = overlap.topRepos.slice(0, 30).map((repo) => `                  <tr><td><a href="${esc(repo.url)}" target="_blank" rel="noreferrer">${esc(repo.name)}</a></td><td>${fmt(repo.overlap)}</td><td>${pct(repo.share)}</td><td><span class="relation-pill ${relationClass(repo.relation)}">${esc(repo.relation)}</span></td><td>${esc(repo.category)}</td><td>${fmt(repo.stars)}</td><td>${esc(repo.description)}</td><td>${esc(repo.scenario)}</td><td>${esc(repo.language)}</td></tr>`).join("\n");

const categoryRows = overlap.categories.map((item) => `                <tr><td>${esc(item.category)}</td><td>${fmt(item.count)}</td><td>${(item.share * 100).toFixed(1)}%</td></tr>`).join("\n");

const dataflow = overlap.topRepos.find((repo) => repo.name === "OpenDCAI/DataFlow");
const agentNames = overlap.topRepos
  .filter((repo) => repo.category === "Agent / workflow")
  .slice(0, 3)
  .map((repo) => repo.name)
  .join("、");

const section = `      <section class="panel stargazer-overlap-panel">
        <div class="panel-heading">
          <div>
            <h2>共同关注网络：兴趣相关度与潜在场景（${monthLabel}月）</h2>
            <p>基于 ${monthLabel} 月新增 DataFlex stargazer 的公开 starred repos 抓取结果，观察共同关注项目和潜在使用场景。</p>
          </div>
        </div>

        <div class="overlap-meta">
          <span>窗口：${month}-01 到 ${endDate}</span>
          <span>${monthLabel} 月新增 stargazer：${fmt(overlap.users)}</span>
          <span>有效 starred repos：${fmt(overlap.fetched)} / ${fmt(overlap.users)}</span>
          <span>空列表/不可读：${fmt(overlap.failed)}</span>
          <span>每人最多读取最近 ${fmt(overlap.perUserStarLimit)} 个 starred repos</span>
        </div>

        <div class="overlap-insights">
          <article>
            <strong>DataFlow 仍是最强共同兴趣锚点</strong>
            <span>${monthLabel} 月有效样本中，OpenDCAI/DataFlow 被 ${fmt(dataflow?.overlap || 0)} 个用户共同关注，占 ${pct(dataflow?.share || 0)}，说明 DataFlex 的新增兴趣仍高度贴近 OpenDCAI 数据工程生态。</span>
          </article>
          <article>
            <strong>Agent / Workflow 场景继续高频出现</strong>
            <span>${esc(agentNames)} 等项目靠前，暗示 DataFlex 的潜在叙事可以连接 Agent/RAG 场景中的训练数据、评测数据和任务样本治理。</span>
          </article>
        </div>

        <div class="overlap-table-grid">
          <div class="overlap-table-intro">
            <div>
              <h3>共同关注项目 Top 30：${monthLabel} 月真实抓取样本</h3>
              <p>按 ${monthLabel} 月已读取公开 starred repos 的用户聚合。共同用户数表示同一批 DataFlex 新增 stargazer 中也 star 了该项目的人数。</p>
            </div>
            <div class="overlap-scroll-actions" aria-label="横向滚动表格">
              <button type="button" onclick="this.closest('.overlap-table-grid').querySelector('.overlap-table-wrap').scrollBy({ left: -640, behavior: 'smooth' })">←</button>
              <button type="button" onclick="this.closest('.overlap-table-grid').querySelector('.overlap-table-wrap').scrollBy({ left: 640, behavior: 'smooth' })">→</button>
            </div>
          </div>
          <div class="table-wrap overlap-table-wrap">
            <table class="overlap-table">
              <thead>
                <tr>
                  <th>项目</th>
                  <th>共同用户</th>
                  <th>样本占比</th>
                  <th>关系</th>
                  <th>分类</th>
                  <th>Stars</th>
                  <th>描述</th>
                  <th>具体关系 / 可设计场景</th>
                  <th>语言</th>
                </tr>
              </thead>
              <tbody>
${topRows}
              </tbody>
            </table>
          </div>

          <div class="table-wrap overlap-category-wrap">
            <table>
              <thead>
                <tr>
                  <th>兴趣分类</th>
                  <th>共现次数</th>
                  <th>占比</th>
                </tr>
              </thead>
              <tbody>
${categoryRows}
              </tbody>
            </table>
          </div>
        </div>

        <p class="overlap-note">口径：分析 ${month}-01 到 ${endDate} 给 OpenDCAI/DataFlex 点 star 的新增用户；当前已读取 ${fmt(overlap.fetched)} / ${fmt(overlap.users)} 个用户的非空公开 starred repos，${fmt(overlap.failed)} 个用户为空列表或不可读。每人最多最近 ${fmt(overlap.perUserStarLimit)} 个公开 starred repos。GitHub 不提供共同 star 图谱接口，本分析由公开 stargazer 和用户 starred repos 聚合而来，适合判断兴趣相关度，不等同于真实使用关系。</p>
      </section>`;

const html = fs.readFileSync(indexPath, "utf8");
const start = html.indexOf('      <section class="panel stargazer-overlap-panel">');
const end = html.indexOf('      <details class="panel stargazer-overlap-panel overlap-archive"', start);
if (start === -1 || end === -1) {
  throw new Error("Cannot locate August overlap section");
}

fs.writeFileSync(indexPath, `${html.slice(0, start)}${section}\n\n${html.slice(end)}`);
console.log(`updated ${indexPath}`);
