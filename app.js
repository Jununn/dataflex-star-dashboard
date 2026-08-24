const snapshot = {
  date: "2026-08-24",
  time: "2026-08-24 13:37",
  timelineEnd: "2026-08-24",
  stars: 2220,
  forks: 300,
  watchers: 182,
  createdAt: "2025-08-09",
  pushedAt: "2026-08-22",
  description:
    "Data-centric LLM training with dynamic sample selection, domain mixture optimization, and example reweighting inside the LLaMA-Factory training loop."
};

const nonZeroDailyCounts = [
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
  ["2026-04-24", 16],
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
  ["2026-05-12", 9],
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
  ["2026-06-25", 11],
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
  ["2026-07-22", 17],
  ["2026-07-23", 27],
  ["2026-07-24", 14],
  ["2026-07-25", 28],
  ["2026-07-26", 20],
  ["2026-07-27", 21],
  ["2026-07-28", 18],
  ["2026-07-29", 15],
  ["2026-07-30", 20],
  ["2026-07-31", 30],
  ["2026-08-01", 14],
  ["2026-08-02", 20],
  ["2026-08-03", 12],
  ["2026-08-04", 17],
  ["2026-08-05", 22],
  ["2026-08-06", 21],
  ["2026-08-07", 11],
  ["2026-08-08", 18],
  ["2026-08-09", 22],
  ["2026-08-10", 18],
  ["2026-08-11", 24],
  ["2026-08-12", 18],
  ["2026-08-13", 5],
  ["2026-08-14", 16],
  ["2026-08-15", 8],
  ["2026-08-16", 25],
  ["2026-08-17", 15],
  ["2026-08-18", 15],
  ["2026-08-19", 21],
  ["2026-08-20", 19],
  ["2026-08-21", 17],
  ["2026-08-22", 19],
  ["2026-08-23", 21],
  ["2026-08-24", 6]
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
    end: snapshot.timelineEnd,
    note: "5 月日增大多稳定在 7-16 区间；6 月下旬和 7 月下旬各有一次抬升，6/28、7/31 分别到达 37、30 stars。8 月初仍保持稳定新增；自动更新时逐日数据按 GitHub stargazers API 的 starred_at UTC 日期聚合，顶部总量以 GitHub 当前公开计数为准。"
  }
];

const actions = [
  ["2025-12-23", "Release", "DataFlex 首次公开发布", "https://github.com/OpenDCAI/DataFlex"],
  ["2026-03-17", "README", "支持 DeepSpeed ZeRO-3 训练与分析", "https://github.com/OpenDCAI/DataFlex#-1-news"],
  ["2026-04-03", "X", "DataFlex 论文发布", "https://x.com/PKU_DCAI/status/2040003575687131238"],
  ["2026-04-04", "Hugging Face", "技术报告登上 Daily Papers 当日 #1", "https://huggingface.co/papers/2603.26164"],
  ["2026-04-11", "线下活动", "上交大校庆 - AI 集市 - 摆摊", "https://m.alltuu.com/album/f6733a3418cfc0dee17767d66ccdf6bc/?menu=live"],
  ["2026-04-15", "公众号", "机器之心 - DataFlex", "https://mp.weixin.qq.com/s/QoXfElsL0UL8kAk_ThfYcw"],
  ["2026-04-20", "公众号", "Datawhale - DataFlex", "https://mp.weixin.qq.com/s/tGj9PZTHhmdo_w0ChW-O4Q"],
  ["2026-04-23", "线下活动", "WAIC FT Demo Day - 路演", "https://mp.weixin.qq.com/s/iR-blUEca-l6NcXkuQmIfw"],
  ["2026-04-25", "线下活动", "DataFun - 上海 - 演讲", "https://www.bagevent.com/event/9108668"],
  ["2026-05-26", "公众号", "数科星球 - 深度拆解 DataFlow 和 DataFlex", "#"],
  ["2026-06-16", "小红书", "df+lf教程 AI-Ready 数据准备 + LLM 动态训练实战", "http://xhslink.com/o/3sXUuMY03OQ"],
  ["2026-06-26", "线下活动", "GIAC演讲", "https://giac.msup.com.cn/2026sz/schedule"],
  ["2026-07-03", "线下活动", "AgenticAICon演讲", "https://agenticaicon.zhidx.com/2026/"],
  ["2026-07-16", "线下活动", "开放麦 ppio-waic 开放麦", "#"],
  ["2026-07-17", "线下活动", "WAIC", "#"],
  ["2026-07-18", "线下活动", "WAIC", "#"],
  ["2026-07-19", "线下活动", "WAIC", "#"],
  ["2026-07-20", "线下活动", "WAIC", "#"],
  ["2026-08-11", "Reddit", "dataflex-oss", "https://www.reddit.com/r/LLMDevs/comments/1vldmfd/three_dynamic_data_strategies_when_compute_is/"],
  ["2026-08-12", "Facebook", "dataflex-data strategy", "https://www.facebook.com/groups/968349588962639/permalink/1072774705186793/"],
  ["2026-08-12", "LinkedIn", "dataflex-data strategy", "https://linkedin.com/feed/update/urn:li:groupPost:43875-7493240367803363328"],
  ["2026-08-13", "Reddit", "dataflex-oss", "https://www.reddit.com/r/LLM/comments/1vn760h/data_selection_mixing_and_weighting_during_model/"],
  ["2026-08-13", "LinkedIn", "dataflex-oss", "https://www.linkedin.com/feed/update/urn:li:groupPost:8430025-7493619054750912513/"],
  ["2026-08-14", "Facebook", "flex 模型训练", "https://www.facebook.com/groups/3670562573177653/my_pending_content"],
  ["2026-08-18", "LinkedIn", "flex-oss", "https://www.linkedin.com/feed/update/urn:li:groupPost:7036558-7495432001219383297/"],
  ["2026-08-21", "线下活动", "AIDD", "https://www.aidd.vip/QYJDMSC-2026bj"]
].map(([date, channel, title, url]) => ({ date, channel, title, url }));

const trafficRows = [
  ["2026-08-09", 30, 8, 150, 19],
  ["2026-08-10", 43, 15, 8, 5],
  ["2026-08-11", 34, 15, 28, 7],
  ["2026-08-12", 25, 14, 14, 11],
  ["2026-08-13", 52, 13, 23, 11],
  ["2026-08-14", 24, 15, 14, 12],
  ["2026-08-15", 5, 5, 15, 8],
  ["2026-08-16", 13, 4, 20, 10],
  ["2026-08-17", 31, 13, 10, 8],
  ["2026-08-18", 46, 19, 27, 7],
  ["2026-08-19", 14, 9, 14, 5],
  ["2026-08-20", 11, 9, 41, 9],
  ["2026-08-21", 11, 8, 6, 5],
  ["2026-08-22", 5, 5, 34, 10]
].map(([date, views, uniqueVisitors, clones, uniqueCloners]) => ({
  date,
  views,
  uniqueVisitors,
  clones,
  uniqueCloners
}));

const trafficWindowTotals = {
  views: 344,
  uniqueVisitors: 112,
  clones: 404,
  uniqueCloners: 106
};

const trafficReferrers = [
  ["github.com", 132, 44],
  ["zwt233.github.io", 28, 14],
  ["Google", 27, 15],
  ["Bing", 7, 3],
  ["linkedin.com", 6, 5],
  ["haolpku.github.io", 3, 1],
  ["Baidu", 2, 1],
  ["chatgpt.com", 1, 1],
  ["doubao.com", 1, 1],
  ["theroadqaq.github.io", 1, 1]
].map(([site, views, uniqueVisitors]) => ({ site, views, uniqueVisitors }));

const trafficPopularContent = [
  ["Overview", 150, 92],
  ["/blob/main/README-zh.md", 39, 26],
  ["/pulls", 17, 4],
  ["/commits/main", 15, 4],
  ["/issues", 12, 8],
  ["/pull/62", 12, 5],
  ["/graphs/contributors", 10, 6],
  ["/tree/main", 6, 5],
  ["/pull/58", 6, 4],
  ["/pull/59", 5, 2]
].map(([content, views, uniqueVisitors]) => ({ content, views, uniqueVisitors }));

let benchmarkSnapshotDate = "2026-08-24";
let benchmarkPreviousSnapshotDate = "2026-08-14";

const benchmarkSnapshots = {
  "2026-08-05": {
    "hiyouga/LlamaFactory": 73760
  },
  "2026-08-10": {
    "hiyouga/LlamaFactory": 73956,
    "verl-project/verl": 22891,
    "huggingface/trl": 19031,
    "openrlhf/openrlhf": 9901,
    "axolotl-ai-cloud/axolotl": 12331,
    "OpenDCAI/DataFlex": 1978
  },
  "2026-08-11": {
    "hiyouga/LlamaFactory": 73978,
    "verl-project/verl": 22907,
    "huggingface/trl": 19043,
    "openrlhf/openrlhf": 9901,
    "axolotl-ai-cloud/axolotl": 12335,
    "OpenDCAI/DataFlex": 1994
  },
  "2026-08-12": {
    "hiyouga/LlamaFactory": 74019,
    "verl-project/verl": 22925,
    "huggingface/trl": 19057,
    "openrlhf/openrlhf": 9906,
    "axolotl-ai-cloud/axolotl": 12344,
    "OpenDCAI/DataFlex": 2030
  },
  "2026-08-13": {
    "hiyouga/LlamaFactory": 74058,
    "verl-project/verl": 22945,
    "huggingface/trl": 19066,
    "openrlhf/openrlhf": 9907,
    "axolotl-ai-cloud/axolotl": 12349,
    "OpenDCAI/DataFlex": 2035
  },
  "2026-08-14": {
    "hiyouga/LlamaFactory": 74072,
    "verl-project/verl": 22953,
    "huggingface/trl": 19068,
    "openrlhf/openrlhf": 9908,
    "axolotl-ai-cloud/axolotl": 12352,
    "OpenDCAI/DataFlex": 2043
  },
  "2026-08-24": {
    "hiyouga/LlamaFactory": 74303,
    "verl-project/verl": 23093,
    "huggingface/trl": 19137,
    "openrlhf/openrlhf": 9948,
    "axolotl-ai-cloud/axolotl": 12393,
    "OpenDCAI/DataFlex": 2220
  }
};

const benchmarkRepos = [
  {
    name: "hiyouga/LlamaFactory",
    stars: 74303,
    forks: 9093,
    recentChange: 231,
    yesterdayChange: 0,
    color: "#5b8def",
    note: "DataFlex 的训练底座生态参照。",
    points: [
      ["2025-01-01", 35805],
      ["2025-01-31", 37895],
      ["2025-02-28", 41284],
      ["2025-03-31", 44534],
      ["2025-04-30", 46845],
      ["2025-05-31", 50077],
      ["2025-06-30", 52078],
      ["2025-07-31", 54207],
      ["2025-08-31", 55967],
      ["2025-09-30", 58611],
      ["2025-10-31", 60542],
      ["2025-11-30", 62450],
      ["2025-12-31", 63939],
      ["2026-01-31", 65987],
      ["2026-02-28", 67085],
      ["2026-03-31", 68831],
      ["2026-04-30", 70465],
      ["2026-05-31", 71570],
      ["2026-06-30", 72799],
      ["2026-07-31", 73651],
      ["2026-08-05", 73760],
      ["2026-08-10", 73956],
      ["2026-08-11", 73978],
      ["2026-08-12", 74019],
      ["2026-08-13", 74058],
      ["2026-08-14", 74072],
      ["2026-08-24", 74303]
    ]
  },
  {
    name: "verl-project/verl",
    stars: 23093,
    forks: 4442,
    recentChange: 140,
    yesterdayChange: 0,
    color: "#2a9d8f",
    note: "RLHF / post-training 工程生态参照。",
    points: [
      ["2025-01-01", 459],
      ["2025-01-31", 1498],
      ["2025-02-28", 3804],
      ["2025-03-31", 5792],
      ["2025-04-30", 7264],
      ["2025-05-31", 8599],
      ["2025-06-30", 9965],
      ["2025-07-31", 11446],
      ["2025-08-31", 12599],
      ["2025-09-30", 13694],
      ["2025-10-31", 14749],
      ["2025-11-30", 16712],
      ["2025-12-31", 17728],
      ["2026-01-31", 18671],
      ["2026-02-28", 19300],
      ["2026-03-31", 20222],
      ["2026-04-30", 20950],
      ["2026-05-31", 21630],
      ["2026-06-30", 22230],
      ["2026-07-31", 22746],
      ["2026-08-10", 22891],
      ["2026-08-11", 22907],
      ["2026-08-12", 22925],
      ["2026-08-13", 22945],
      ["2026-08-14", 22953],
      ["2026-08-24", 23093]
    ]
  },
  {
    name: "huggingface/trl",
    stars: 19137,
    forks: 2928,
    recentChange: 69,
    yesterdayChange: 0,
    color: "#d94f70",
    note: "Hugging Face 训练与 RLHF 工具链参照。",
    points: [
      ["2025-01-01", 10202],
      ["2025-01-31", 10639],
      ["2025-02-28", 11808],
      ["2025-03-31", 12670],
      ["2025-04-30", 13253],
      ["2025-05-31", 13717],
      ["2025-06-30", 14124],
      ["2025-07-31", 14597],
      ["2025-08-31", 15068],
      ["2025-09-30", 15476],
      ["2025-10-31", 15874],
      ["2025-11-30", 16266],
      ["2025-12-31", 16645],
      ["2026-01-31", 17061],
      ["2026-02-28", 17335],
      ["2026-03-31", 17734],
      ["2026-04-30", 18121],
      ["2026-05-31", 18447],
      ["2026-06-30", 18715],
      ["2026-07-31", 18975],
      ["2026-08-10", 19031],
      ["2026-08-11", 19043],
      ["2026-08-12", 19057],
      ["2026-08-13", 19066],
      ["2026-08-14", 19068],
      ["2026-08-24", 19137]
    ]
  },
  {
    name: "openrlhf/openrlhf",
    stars: 9948,
    forks: 1004,
    recentChange: 40,
    yesterdayChange: 0,
    color: "#6b7280",
    note: "开源 RLHF 训练框架参照。",
    points: [
      ["2025-01-01", 3322],
      ["2025-01-31", 4043],
      ["2025-02-28", 5020],
      ["2025-03-31", 5862],
      ["2025-04-30", 6368],
      ["2025-05-31", 6763],
      ["2025-06-30", 7092],
      ["2025-07-31", 7421],
      ["2025-08-31", 7674],
      ["2025-09-30", 7927],
      ["2025-10-31", 8179],
      ["2025-11-30", 8385],
      ["2025-12-31", 8593],
      ["2026-01-31", 8831],
      ["2026-02-28", 8982],
      ["2026-03-31", 9223],
      ["2026-04-30", 9398],
      ["2026-05-31", 9550],
      ["2026-06-30", 9709],
      ["2026-07-31", 9867],
      ["2026-08-10", 9901],
      ["2026-08-11", 9901],
      ["2026-08-12", 9906],
      ["2026-08-13", 9907],
      ["2026-08-14", 9908],
      ["2026-08-24", 9948]
    ]
  },
  {
    name: "axolotl-ai-cloud/axolotl",
    stars: 12393,
    forks: 1413,
    recentChange: 41,
    yesterdayChange: 0,
    color: "#d58a2a",
    note: "LLM fine-tuning / post-training 工具链参照。",
    points: [
      ["2025-01-01", 7990],
      ["2025-01-31", 8239],
      ["2025-02-28", 8552],
      ["2025-03-31", 8789],
      ["2025-04-30", 9055],
      ["2025-05-31", 9303],
      ["2025-06-30", 9620],
      ["2025-07-31", 9912],
      ["2025-08-31", 10151],
      ["2025-09-30", 10358],
      ["2025-10-31", 10577],
      ["2025-11-30", 10742],
      ["2025-12-31", 10903],
      ["2026-01-31", 11085],
      ["2026-02-28", 11275],
      ["2026-03-31", 11481],
      ["2026-04-30", 11743],
      ["2026-05-31", 11963],
      ["2026-06-30", 12118],
      ["2026-07-31", 12291],
      ["2026-08-10", 12331],
      ["2026-08-11", 12335],
      ["2026-08-12", 12344],
      ["2026-08-13", 12349],
      ["2026-08-14", 12352],
      ["2026-08-24", 12393]
    ]
  },
  {
    name: "OpenDCAI/DataFlex",
    stars: 2220,
    forks: 300,
    recentChange: 177,
    yesterdayChange: 21,
    color: "#635bff",
    note: "当前看板目标仓库。",
    points: [
      ["2026-04-01", 140],
      ["2026-04-30", 517],
      ["2026-05-31", 855],
      ["2026-06-30", 1285],
      ["2026-07-31", 1818],
      ["2026-08-10", 1978],
      ["2026-08-11", 1994],
      ["2026-08-12", 2030],
      ["2026-08-13", 2035],
      ["2026-08-14", 2043],
      ["2026-08-17", 2099],
      ["2026-08-24", 2220]
    ]
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
const dailyCounts = buildDailyCounts(chartStartDate, snapshot.timelineEnd, nonZeroDailyCounts);
let runningStars = 0;
const rawData = dailyCounts.map(([date, stars]) => {
  runningStars += stars;
  return {
    date,
    stars,
    cumulative: runningStars,
    phase: phases.find((phase) => date >= phase.start && date <= phase.end),
    actions: byDateActions[date] || []
  };
});
const cumulativeOffset = snapshot.stars - rawData.at(-1).cumulative;
const data = rawData.map((item) => ({
  ...item,
  cumulative: item.cumulative + cumulativeOffset
}));
const chartData = data.filter((item) => item.date >= chartStartDate);

let calendarMonth = dailyCounts.at(-1)[0].slice(0, 7);

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function renderLastUpdatedBadge() {
  const badge = document.getElementById("lastUpdatedBadge");
  if (!badge) return;
  badge.textContent = `上次更新 ${snapshot.time}`;
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
  if (normalized.includes("reddit")) return "channel-reddit";
  if (normalized.includes("linkedin")) return "channel-linkedin";
  if (normalized.includes("facebook")) return "channel-facebook";
  if (channel.includes("小红书")) return "channel-xhs";
  if (channel.includes("公众号")) return "channel-wechat";
  if (channel.includes("线下活动")) return "channel-offline";
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
      const day = new Date(`${item.date}T00:00:00Z`).getUTCDay();
      const isWeekend = day === 0 || day === 6;
      const cls = item.stars >= 50 ? "bar hot" : isWeekend ? "bar weekend" : "bar";
      return `<rect class="${cls}" x="${bx}" y="${by}" width="${barW}" height="${margin.top + chartH - by}" rx="2"></rect>`;
    })
    .join("");
  const line = chartData.map((item, i) => `${x(i)},${yCum(item.cumulative)}`).join(" ");
  const pins = chartData
    .filter((item) => item.actions.length)
    .map((item) => {
      const i = chartData.indexOf(item);
      return `<circle class="action-pin" cx="${x(i)}" cy="${yStars(Math.max(item.stars, 2)) - 8}" r="3"><title>${item.date}: ${item.actions.map((a) => a.title).join(" / ")}</title></circle>`;
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

function renderTrafficChart() {
  const trafficData = trafficRows.map((row) => ({
    ...row,
    stars: data.find((item) => item.date === row.date)?.stars || 0
  }));
  const series = [
    { key: "uniqueVisitors", label: "独立访客", color: "#14b8a6" },
    { key: "stars", label: "新增 stars", color: "#e0a000" },
    { key: "clones", label: "Clones", color: "#f97316" },
    { key: "uniqueCloners", label: "独立 cloners", color: "#8b5cf6" }
  ];
  const width = 1180;
  const height = 360;
  const margin = { top: 28, right: 34, bottom: 72, left: 66 };
  const chartW = width - margin.left - margin.right;
  const chartH = height - margin.top - margin.bottom;
  const maxValue = Math.max(...trafficData.flatMap((row) => series.map((item) => row[item.key])));
  const maxCount = Math.max(180, Math.ceil(maxValue / 60) * 60);
  const x = (index) => margin.left + (index / (trafficData.length - 1)) * chartW;
  const y = (value) => margin.top + chartH - (value / maxCount) * chartH;
  const gridTicks = Array.from({ length: Math.floor(maxCount / 60) + 1 }, (_, index) => index * 60);
  const grid = gridTicks
    .map((tick) => `<line class="grid-line" x1="${margin.left}" y1="${y(tick)}" x2="${width - margin.right}" y2="${y(tick)}"></line><text class="chart-label" x="${margin.left - 12}" y="${y(tick) + 4}" text-anchor="end">${tick}</text>`)
    .join("");
  const lines = series
    .map((item) => {
      const points = trafficData.map((row, index) => `${x(index).toFixed(1)},${y(row[item.key]).toFixed(1)}`).join(" ");
      const circles = trafficData
        .map((row, index) => `<circle class="traffic-point" cx="${x(index).toFixed(1)}" cy="${y(row[item.key]).toFixed(1)}" r="4" fill="${item.color}" data-date="${row.date}"></circle>`)
        .join("");
      return `<polyline class="traffic-line" points="${points}" stroke="${item.color}"></polyline>${circles}`;
    })
    .join("");
  const dateLabels = trafficData
    .map((row, index) => `<text class="chart-label traffic-date-label" x="${x(index)}" y="${height - 26}" text-anchor="end" transform="rotate(-45 ${x(index)} ${height - 26})">${row.date.slice(5)}</text>`)
    .join("");
  const hoverZones = trafficData
    .map((row, index) => {
      const previousX = index === 0 ? margin.left : (x(index - 1) + x(index)) / 2;
      const nextX = index === trafficData.length - 1 ? width - margin.right : (x(index) + x(index + 1)) / 2;
      return `<rect class="traffic-hover-zone" x="${previousX.toFixed(1)}" y="${margin.top}" width="${Math.max(8, nextX - previousX).toFixed(1)}" height="${chartH}" data-date="${row.date}"></rect>`;
    })
    .join("");
  document.getElementById("trafficChart").innerHTML = `
    <div id="trafficTooltip" class="chart-tooltip" hidden></div>
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Traffic and daily stars comparison">
      ${grid}
      ${lines}
      ${hoverZones}
      <line x1="${margin.left}" y1="${margin.top + chartH}" x2="${width - margin.right}" y2="${margin.top + chartH}" stroke="#cbd5e1"></line>
      <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + chartH}" stroke="#cbd5e1"></line>
      ${dateLabels}
      <text class="axis-title" x="${margin.left - 34}" y="${margin.top - 10}">Count</text>
    </svg>`;
  renderTrafficSummary(trafficData);
  bindTrafficTooltip(trafficData, series);
}

function renderTrafficSummary(trafficData) {
  const months = Array.from(new Set(trafficData.map((row) => row.date.slice(0, 7))));
  const dailyUniqueVisitors = trafficData.reduce((sum, row) => sum + row.uniqueVisitors, 0);
  const dailyUniqueCloners = trafficData.reduce((sum, row) => sum + row.uniqueCloners, 0);
  const windowCard = `<article class="traffic-card">
    <span>${trafficData[0].date.slice(5)} 到 ${trafficData.at(-1).date.slice(5)}</span>
    <strong>GitHub Traffic 14 天窗口</strong>
    <p>总浏览 ${formatNumber(trafficWindowTotals.views)}，去重独立访客 ${formatNumber(trafficWindowTotals.uniqueVisitors)}；clones ${formatNumber(trafficWindowTotals.clones)}，去重独立 cloners ${formatNumber(trafficWindowTotals.uniqueCloners)}。逐日 unique 相加分别为访客 ${formatNumber(dailyUniqueVisitors)}、cloners ${formatNumber(dailyUniqueCloners)}。</p>
  </article>`;
  const monthCards = months
    .map((month) => {
      const rows = trafficData.filter((row) => row.date.startsWith(month));
      const uniqueVisitors = rows.reduce((sum, row) => sum + row.uniqueVisitors, 0);
      const stars = rows.reduce((sum, row) => sum + row.stars, 0);
      const clones = rows.reduce((sum, row) => sum + row.clones, 0);
      const uniqueCloners = rows.reduce((sum, row) => sum + row.uniqueCloners, 0);
      const average = rows.length ? uniqueVisitors / rows.length : 0;
      return `<article class="traffic-card">
        <span>${month.replace("-", " 年 ")} 月</span>
        <strong>${average.toFixed(1)}/day</strong>
        <p>${rows.length} 天样本，累计独立访客 ${formatNumber(uniqueVisitors)}，新增 stars ${formatNumber(stars)}，clones ${formatNumber(clones)}，独立 cloners ${formatNumber(uniqueCloners)}，截至 ${rows.at(-1).date.slice(5)}。</p>
      </article>`;
    })
    .join("");
  document.getElementById("trafficSummary").innerHTML = `${windowCard}${monthCards}`;
}

function renderTrafficTables() {
  const renderRows = (rows, labelKey) => rows
    .map((row) => `<tr>
      <td>${escapeHtml(row[labelKey])}</td>
      <td>${formatNumber(row.views)}</td>
      <td>${formatNumber(row.uniqueVisitors)}</td>
    </tr>`)
    .join("");

  document.getElementById("trafficTables").innerHTML = `
    <article class="traffic-table-card">
      <h3>Referring sites</h3>
      <div class="table-wrap traffic-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Site</th>
              <th>Views</th>
              <th>Unique Visitors</th>
            </tr>
          </thead>
          <tbody>${renderRows(trafficReferrers, "site")}</tbody>
        </table>
      </div>
    </article>
    <article class="traffic-table-card">
      <h3>Popular content</h3>
      <div class="table-wrap traffic-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Content</th>
              <th>Views</th>
              <th>Unique Visitors</th>
            </tr>
          </thead>
          <tbody>${renderRows(trafficPopularContent, "content")}</tbody>
        </table>
      </div>
    </article>`;
}

function bindTrafficTooltip(trafficData, series) {
  const wrap = document.getElementById("trafficChart");
  const tooltip = document.getElementById("trafficTooltip");
  wrap.querySelectorAll(".traffic-point, .traffic-hover-zone").forEach((target) => {
    target.addEventListener("mousemove", (event) => {
      const row = trafficData.find((item) => item.date === target.dataset.date);
      if (!row) return;
      const rect = wrap.getBoundingClientRect();
      tooltip.hidden = false;
      tooltip.style.left = `${event.clientX - rect.left + wrap.scrollLeft}px`;
      tooltip.style.top = `${event.clientY - rect.top + wrap.scrollTop}px`;
      tooltip.innerHTML = `<strong>${row.date}</strong>${series
        .map((item) => `<span class="traffic-tooltip-row"><i style="background:${item.color}"></i><b>${item.label}</b><em>${formatNumber(row[item.key])}</em></span>`)
        .join("")}<span>总浏览：${formatNumber(row.views)}</span>`;
    });
    target.addEventListener("mouseleave", () => {
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
    .filter((phase) => data.some((item) => item.phase?.id === phase.id))
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

function benchmarkMonthlyAdds(repo) {
  const points = repo.points || [];
  const monthGroups = [];
  for (const [date, value] of points) {
    const label = date.slice(0, 7);
    const current = monthGroups.at(-1);
    if (!current || current.label !== label) {
      monthGroups.push({ label, firstDate: date, firstValue: value, lastDate: date, lastValue: value });
    } else {
      current.lastDate = date;
      current.lastValue = value;
    }
  }
  return monthGroups.map((group, index) => {
    const previousValue = index > 0 ? monthGroups[index - 1].lastValue : group.firstValue;
    return {
      date: group.lastDate,
      label: group.label,
      stars: Math.max(0, group.lastValue - previousValue)
    };
  });
}

function benchmarkYesterdayChange(repo) {
  if (Number.isFinite(repo.yesterdayChange)) return repo.yesterdayChange;
  if (repo.name !== "OpenDCAI/DataFlex") return null;

  const cursor = new Date(`${benchmarkSnapshotDate}T00:00:00Z`);
  cursor.setUTCDate(cursor.getUTCDate() - 1);
  const yesterday = cursor.toISOString().slice(0, 10);
  return data.find((item) => item.date === yesterday)?.stars ?? null;
}

function renderBenchmark() {
  const sorted = benchmarkRepos.slice().sort((a, b) => b.stars - a.stars);
  document.getElementById("benchmarkCards").innerHTML = sorted
    .map((repo, index) => {
      const monthlyAdds = benchmarkMonthlyAdds(repo);
      const latestMonth = monthlyAdds.at(-1);
      const dayOfMonth = Number(benchmarkSnapshotDate.slice(8, 10));
      const dailyAverage = latestMonth ? latestMonth.stars / Math.max(1, dayOfMonth) : 0;
      const yesterdayChange = benchmarkYesterdayChange(repo);
      const yesterdayText = yesterdayChange === null ? "--" : `+${formatNumber(yesterdayChange)}`;
      const targetClass = repo.name === "OpenDCAI/DataFlex" ? " is-target" : "";
      return `<a class="benchmark-card${targetClass}" href="https://github.com/${repo.name}" target="_blank" rel="noreferrer">
      <i style="background:${repo.color}"></i>
      <span class="benchmark-rank">#${index + 1}</span>
      <strong>${repo.name}</strong>
      <em>总数 ${formatNumber(repo.stars)}</em>
      <small>${latestMonth?.label || benchmarkSnapshotDate.slice(0, 7)} 月增 +${formatNumber(latestMonth?.stars || 0)}，折算日均 +${dailyAverage.toFixed(1)}，昨日新增 ${yesterdayText}</small>
      <b>${repo.note}</b>
    </a>`;
    })
    .join("");

  const width = 1180;
  const height = 572;
  const margin = { top: 46, right: 220, bottom: 56, left: 64 };
  const chartW = width - margin.left - margin.right;
  const chartH = height - margin.top - margin.bottom;
  const series = sorted
    .map((repo) => ({ repo, monthlyAdds: benchmarkMonthlyAdds(repo) }))
    .filter(({ monthlyAdds }) => monthlyAdds.length);
  const allPoints = series.flatMap(({ monthlyAdds }) => monthlyAdds);
  const minTime = Math.min(...allPoints.map((point) => new Date(`${point.date}T00:00:00Z`).getTime()));
  const maxTime = Math.max(...allPoints.map((point) => new Date(`${point.date}T00:00:00Z`).getTime()));
  const maxMonthlyStars = Math.max(500, Math.ceil(Math.max(...allPoints.map((point) => point.stars)) / 500) * 500);
  const x = (date) => {
    if (minTime === maxTime) return margin.left + chartW;
    return margin.left + ((new Date(`${date}T00:00:00Z`).getTime() - minTime) / (maxTime - minTime)) * chartW;
  };
  const y = (value) => margin.top + chartH - (value / maxMonthlyStars) * chartH;
  const ticks = Array.from({ length: 6 }, (_, index) => Math.round((maxMonthlyStars / 5) * index));
  const grid = ticks
    .map((tick) => `<line class="grid-line" x1="${margin.left}" y1="${y(tick)}" x2="${width - margin.right}" y2="${y(tick)}"></line><text class="chart-label" x="18" y="${y(tick) + 4}">${formatNumber(tick)}</text>`)
    .join("");
  const labelDates = [...new Set(allPoints.map((point) => point.date))].sort();
  const dateLabelRows = labelDates.reduce((labels, date, index) => {
    if (index % 3 !== 0 && index !== labelDates.length - 1) return labels;
    const labelX = x(date);
    const previous = labels.at(-1);
    if (previous && labelX - previous.x < 72) {
      if (index === labelDates.length - 1) labels[labels.length - 1] = { date, x: labelX };
      return labels;
    }
    labels.push({ date, x: labelX });
    return labels;
  }, []);
  const dateLabels = dateLabelRows
    .map(({ date, x: labelX }) => `<text class="chart-label" x="${labelX - 24}" y="${height - 22}">${date.slice(5)}</text>`)
    .join("");
  const labelGap = 28;
  const minLabelY = margin.top + 16;
  const maxLabelY = margin.top + chartH - 18;
  const labelRows = series
    .map(({ repo, monthlyAdds }) => ({ repo, y: y(monthlyAdds.at(-1).stars) }))
    .sort((a, b) => a.y - b.y);
  const placedLabels = labelRows.reduce((labels, item, index) => {
    const previous = labels.at(-1);
    const labelY = previous ? Math.max(item.y, previous.y + labelGap) : Math.max(item.y, minLabelY);
    labels.push({ ...item, y: labelY });
    return labels;
  }, []);
  const overflow = (placedLabels.at(-1)?.y || 0) - maxLabelY;
  if (overflow > 0) {
    placedLabels.forEach((item) => {
      item.y = Math.max(minLabelY, item.y - overflow);
    });
  }
  const labelPositions = new Map(placedLabels.map((item) => [item.repo.name, item]));
  const labelRightX = width - 24;
  const lines = series
    .map(({ repo, monthlyAdds }) => {
      const line = monthlyAdds.map((point) => `${x(point.date).toFixed(1)},${y(point.stars).toFixed(1)}`).join(" ");
      const lastPoint = monthlyAdds.at(-1);
      const labelPosition = labelPositions.get(repo.name);
      const labelY = labelPosition?.y || y(lastPoint.stars);
      const targetClass = repo.name === "OpenDCAI/DataFlex" ? " is-target" : "";
      const pointRadius = repo.name === "OpenDCAI/DataFlex" ? 5.5 : 4;
      return `<polyline class="benchmark-line${targetClass}" points="${line}" stroke="${repo.color}"></polyline>
        ${monthlyAdds.map((point) => `<circle class="benchmark-point${targetClass}" cx="${x(point.date).toFixed(1)}" cy="${y(point.stars).toFixed(1)}" r="${pointRadius}" fill="${repo.color}" data-month="${point.label}"></circle>`).join("")}
        <text class="benchmark-end-label${targetClass}" x="${labelRightX}" y="${labelY + 4}" fill="${repo.color}" text-anchor="end">${repo.name.split("/").at(-1)} +${formatNumber(lastPoint.stars)}</text>`;
    })
    .join("");
  const hoverZones = labelDates
    .map((date, index) => {
      const centerX = x(date);
      const previousX = index === 0 ? margin.left : (x(labelDates[index - 1]) + centerX) / 2;
      const nextX = index === labelDates.length - 1 ? margin.left + chartW : (centerX + x(labelDates[index + 1])) / 2;
      return `<rect class="benchmark-hover-zone" x="${previousX.toFixed(1)}" y="${margin.top}" width="${Math.max(4, nextX - previousX).toFixed(1)}" height="${chartH}" data-month="${date.slice(0, 7)}"></rect>`;
    })
    .join("");
  document.getElementById("benchmarkChart").innerHTML = `
    <div id="benchmarkTooltip" class="chart-tooltip" hidden></div>
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Related repository monthly added stars benchmark">
      ${grid}
      <line x1="${margin.left}" y1="${margin.top + chartH}" x2="${width - margin.right}" y2="${margin.top + chartH}" stroke="#cbd5e1"></line>
      <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + chartH}" stroke="#cbd5e1"></line>
      ${dateLabels}
      <text class="axis-title" x="${margin.left}" y="${margin.top - 18}">Monthly New Stars</text>
      <text class="axis-title" x="${margin.left + chartW / 2 - 14}" y="${height - 8}">Date</text>
      ${lines}
      ${hoverZones}
    </svg>`;
  bindBenchmarkTooltip();
}

function renderBenchmarkTooltipMonth(month) {
  const rows = benchmarkRepos
    .map((repo) => {
      const point = benchmarkMonthlyAdds(repo).find((item) => item.label === month);
      return {
        name: repo.name,
        color: repo.color,
        stars: point?.stars ?? null
      };
    })
    .sort((a, b) => (b.stars ?? -1) - (a.stars ?? -1));
  return `<strong>${month} 月新增</strong>${rows
    .map((row) => {
      const value = row.stars === null ? "--" : `+${formatNumber(row.stars)}`;
      return `<span class="benchmark-tooltip-row"><i style="background:${row.color}"></i><b>${escapeHtml(row.name.split("/").at(-1))}</b><em>${value}</em></span>`;
    })
    .join("")}`;
}

function bindBenchmarkTooltip() {
  const wrap = document.getElementById("benchmarkChart");
  const tooltip = document.getElementById("benchmarkTooltip");
  if (!wrap || !tooltip) return;
  wrap.querySelectorAll(".benchmark-point, .benchmark-hover-zone").forEach((target) => {
    target.addEventListener("mousemove", (event) => {
      const rect = wrap.getBoundingClientRect();
      tooltip.hidden = false;
      tooltip.style.left = `${event.clientX - rect.left + wrap.scrollLeft}px`;
      tooltip.style.top = `${event.clientY - rect.top + wrap.scrollTop}px`;
      tooltip.innerHTML = renderBenchmarkTooltipMonth(target.dataset.month);
    });
    target.addEventListener("mouseleave", () => {
      tooltip.hidden = true;
    });
  });
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

renderLastUpdatedBadge();
renderSummary();
renderTrendChart();
renderTrafficChart();
renderTrafficTables();
renderMonthlyChart();
renderMomentum();
renderPhaseCards();
renderBenchmark();
initFilter();
initCalendar();
renderActionCalendar();
