// Tier filters first (Practicum/Academic) so recruiters can slice on work
// type before topic. Industry-NDA work is represented through the experience
// timeline + testimonials instead of confidential case study cards.
export const caseStudyTags = [
  "Practicum",
  "Academic",
  "Promotional Targeting",
  "Portfolio ROI",
  "Commercial Decision Support",
  "Forecasting",
  "Healthcare",
  "Consulting",
  "Strategy",
  "Business Analytics",
  "Data Science",
  "Sports Analytics",
  "Retail",
  "Pricing",
  "BI",
  "Automation",
];

export const caseStudies = [
  {
    id: "model-hub",
    title: "Reusable Forecasting and Decision Model Hub",
    valueProp:
      "Designed a transparent, audit-ready commercial decision support architecture connecting evidence, assumptions, BI data, and forecast outputs.",
    context:
      "Purdue MSBAIM Industry Practicum with PharmaACE - healthcare forecasting focus.",
    problem:
      "Forecast assumptions and model outputs often become difficult to trace, validate, and extend across business use cases.",
    role:
      "Helped structure the model hub, evidence mapping, forecast outputs, dashboard-ready data, and client-ready documentation.",
    approach:
      "Connected evidence sources, lookup tables, BI data, forecast calculations, pivot-ready outputs, and dashboard views into a single hub-and-spoke architecture. Companion tooling generates source-backed epidemiology evidence and exports a dashboard-ready layer for Tableau / Power BI.",
    tools: [
      "Excel",
      "Python (Streamlit)",
      "Tableau",
      "Power BI",
      "Forecasting logic",
      "Structured data design",
    ],
    output:
      "Client-ready Excel model hub plus a Streamlit-based evidence finder / data builder that exports tool-ready datasets and dashboard layers.",
    impact:
      "Improved repeatability, assumption transparency, and scalability for future business questions.",
    skills: [
      "Model design",
      "Decision support",
      "Stakeholder communication",
      "Forecasting",
    ],
    confidentiality:
      "Details generalized - companion tool is a public scaffolded version; client deliverable is under PharmaACE NDA.",
    tier: "Practicum",
    tierLabel: "Practicum · Purdue x PharmaACE",
    tags: ["Practicum", "Commercial Decision Support", "Forecasting", "Healthcare", "Consulting", "Strategy", "Business Analytics"],
    accent: "lime",
    badge: null,
    metric: { label: "Architecture", value: "Hub-and-spoke model hub" },
    repoUrl: "https://github.com/ramanaprabhusana/epidemiology-data-tool",
  },
  {
    id: "multimodal-retail",
    title: "Multimodal Retail Predictive ML",
    valueProp:
      "Promotional targeting under fixed ad budget - hybrid model combining vision-language attributes with classical ML to rank retail SKUs, outperformed LLM-only by ~3x on profit.",
    context:
      "Purdue MSBAIM applied analytics project · Public repo with full methodology.",
    problem:
      "Under a fixed advertising budget, which products should we prioritize for promotion to improve purchase rate while limiting wasted spend on non-converters?",
    role:
      "Designed and built the end-to-end pipeline: vision-language feature extraction, classical ML training, LLM-as-judge baseline, and the hybrid evaluation framework.",
    approach:
      "Compared three tracks: Track B (LLM-only ranking), Track A (logistic regression and XGBoost on VLM-derived features + price + TF-IDF text), and a hybrid that adds LLM probability and decision as features into Track A. Evaluated with PR-AUC, ROC-AUC, Precision@K, and economic-balanced thresholds; SHAP for interpretability.",
    tools: [
      "Python",
      "XGBoost",
      "scikit-learn",
      "Gemini VLM",
      "SHAP",
      "Pandas",
    ],
    output:
      "Hybrid XGBoost + LLM model achieving PR-AUC 0.91, Precision@K 0.96, total profit $1,004 vs $349 LLM-only baseline.",
    impact:
      "Demonstrated that classical ML on VLM-derived features beats LLM-only ranking on these business metrics, with hybrid models delivering best profit at modest interpretability cost.",
    skills: [
      "Predictive modeling",
      "Multimodal ML",
      "Feature engineering",
      "Model evaluation",
      "SHAP interpretability",
      "Pricing & retail analytics",
    ],
    confidentiality: null,
    tier: "Academic",
    tierLabel: "Academic · Purdue MSBAIM",
    tags: ["Academic", "Promotional Targeting", "Data Science", "Retail", "Pricing", "Business Analytics", "Strategy"],
    accent: "violet",
    badge: null,
    metric: { label: "Profit lift", value: "3x LLM baseline" },
    image: "/screenshots/multimodal-retail.jpg",
    repoUrl: "https://github.com/ramanaprabhusana/multimodal-retail-predictive-ml",
  },
  {
    id: "ncaa-bracket",
    title: "Kaggle NCAA Final Four Analytics Challenge - Bracket Prediction",
    valueProp:
      "Finished 3rd of 83 teams (top 3.6%) at the 2026 NCAA Men's Final Four Analytics Challenge on Kaggle, using leakage-safe feature engineering and a gradient-boosted ensemble.",
    context:
      "2026 NCAA Men's Final Four Analytics Challenge - Kaggle Community Prediction Competition hosted by Butler University, with Purdue Krenicki Center for Business Analytics & Machine Learning participation · 83 teams · 1,467 submissions · Team \"This Machine Doesn't Learn\" · Public GitHub repo.",
    problem:
      "Predict each team's NCAA tournament Overall Seed (1-68 for tournament teams; 0 for non-tournament teams) using season-level performance data - without leakage from post-season indicators.",
    role:
      "Co-built the feature pipeline, modeling progression, evaluation framework, and submission generation.",
    approach:
      "v3: leakage-safe feature engineering (NET, SOS, opponent strength, W-L parsing, quadrant resume, interactions); ensembled Random Forest, Gradient Boosting Regressor, and Ridge with weighted blending. v4: added an exact official-seed reconstruction lookup keyed by (Season, Team) with the v3 ensemble as fallback for unmatched names. Evaluated with leave-one-season-out cross-validation, seed-bucket diagnostics, and permutation importance.",
    tools: [
      "Python",
      "scikit-learn",
      "Gradient Boosting",
      "Random Forest",
      "Ridge regression",
      "Pandas",
      "Kaggle",
    ],
    output:
      "Submission file, full methodology + evaluation + interpretability artifacts in the public GitHub repo, and a top-3 finish on the Kaggle private leaderboard.",
    impact:
      "3rd of 83 teams at the 2026 NCAA Men's Final Four Analytics Challenge on Kaggle - end-to-end competition workflow with leakage-safe practices, season-aware cross-validation, and clean ensemble design.",
    skills: [
      "Predictive modeling",
      "Feature engineering",
      "Ensemble methods",
      "Cross-validation discipline",
      "Sports analytics",
      "Kaggle competitions",
    ],
    confidentiality: null,
    tier: "Academic",
    tierLabel: "Academic · Kaggle (Butler x Purdue Krenicki)",
    tags: ["Academic", "Data Science", "Sports Analytics", "Strategy"],
    accent: "cyan",
    badge: "3rd of 83 - Kaggle 2026",
    metric: { label: "Leaderboard", value: "3rd of 83 teams" },
    repoUrl: "https://github.com/ramanaprabhusana/ncaa-final-four-analytics-2026",
    competitionUrl: "https://www.kaggle.com/competitions/final-four-analytics-challenge-26",
  },
  {
    id: "krenicki-ai-finance",
    title: "Multi-Agent AI for SAP Financial Process Transformation",
    valueProp:
      "Multi-agent AI framework inside SAP S/4HANA to automate receivables matching, dispute resolution, and behavioral risk insights - designed to reduce manual AR investigation effort by up to 90%.",
    context:
      "Purdue Krenicki Center for Business Analytics & Machine Learning x Accenture · Boiler Strategy Group · Faculty advisor: Prof. Davi Moreira · Presented at the AI Showcase, March 2026.",
    problem:
      "Manual data entry and reactive dispute management create significant inefficiencies in traditional Accounts Receivable operations for large retail enterprises: high-volume manual matching, reactive dispute handling, and judgment-heavy risk segmentation delay cash collection and inflate operational cost.",
    role:
      "Co-designed the multi-agent AI architecture and the before-vs-after process flows that translate manual task-level steps into agent-driven workflows.",
    approach:
      "Designed three specialized AI agents inside SAP S/4HANA Cloud: an AR Ledger Agent for autonomous payment matching with confidence-tiered routing (auto-clear above 90% confidence; predictive proposal for low-confidence; exception flagging); a Dispute Resolution Agent that scans invoices for errors and recommends fixes such as credit memos; and a Behavioral Insights Agent that scores customers on payment and dispute patterns to flag likely late payers. Built the methodology by extracting ML metrics from SAP documentation and producing 'Before vs. After' flowcharts that double as integration blueprints for any SAP AI agent.",
    tools: [
      "SAP S/4HANA Cloud",
      "Multi-agent AI design",
      "GenAI workflow design",
      "Process modeling",
      "Behavioral analytics",
    ],
    output:
      "Conceptual multi-agent architecture, three agent design specs with before/after flowcharts, AI Showcase poster + executive deck.",
    impact:
      "Showed a scalable framework for integrating agentic AI into enterprise finance - shifting human effort from data searching to strategic review. The Before vs. After flowchart methodology extends beyond AR to any SAP AI agent integration opportunity.",
    skills: [
      "Multi-agent AI design",
      "GenAI workflow design",
      "Enterprise systems thinking",
      "Process redesign",
      "Stakeholder communication",
    ],
    confidentiality:
      "Engagement under Krenicki-Accenture NDA. Public details summarized only from the AI Showcase poster.",
    tier: "Academic",
    tierLabel: "Academic · Purdue Krenicki x Accenture",
    tags: ["Academic", "Data Science", "Automation", "Consulting", "Strategy", "Business Analytics"],
    accent: "violet",
    badge: null,
    metric: { label: "Target", value: "Up to 90% manual AR effort cut" },
    image: "/screenshots/krenicki-ai-finance.jpg",
    repoUrl: null,
    posterUrl: "/krenicki-ai-showcase-poster.pdf",
  },
  {
    id: "ufc-visual-analytics",
    title: "UFC Global Knockout Tour Visual Analytics",
    valueProp:
      "Portfolio ROI analytics for a data-driven UFC \"Global Knockout Tour\" - five global cities, optimal fight cards, and ROI estimates - for an Executive Pitch.",
    context:
      "Purdue MGMT 59000 Visual Analytics · Executive Pitch project · Public repo.",
    problem:
      "Reverse a decline in UFC revenues by designing a five-city global tour with main and co-main events that maximize popularity, balance portfolio risk, and produce defensible ROI estimates.",
    role:
      "Owned data exploration, popularity scoring, portfolio framing, and the executive pitch narrative.",
    approach:
      "Used historical UFC event and fighter data to build a fighter popularity index, design event portfolios across five global cities, and estimate ROI by location. Distilled findings into an executive pitch deck and a written report.",
    tools: ["Python", "Pandas", "Visual analytics", "Executive storytelling"],
    output:
      "Executive pitch deck + final written report recommending five host cities, main + co-main event design, and high-level investment / ROI estimates.",
    impact:
      "Showed decision-ready visual storytelling for an executive audience under real-world business constraints.",
    skills: [
      "Visual analytics",
      "Executive storytelling",
      "Sports analytics",
      "Portfolio framing",
    ],
    confidentiality: null,
    tier: "Academic",
    tierLabel: "Academic · Purdue MGMT 59000",
    tags: ["Academic", "Portfolio ROI", "Sports Analytics", "BI", "Strategy", "Business Analytics"],
    accent: "amber",
    badge: null,
    metric: { label: "Scope", value: "5-city global tour + ROI" },
    image: "/screenshots/ufc-visual-analytics.jpg",
    repoUrl: "https://github.com/ramanaprabhusana/ufc-global-knockout-visual-analytics",
  },
  {
    id: "alpha-stock-gating",
    title: "ML for Cross-Sectional Equity Selection",
    valueProp:
      "XGBoost learning-to-rank for equity alpha selection, evaluated across 192 out-of-sample months (1981-2021). Proposed a two-layer signal + conviction architecture after finding no single model dominates every axis.",
    context:
      "Purdue MSBAIM applied quant project · Public repo with methodology + backtest results.",
    problem:
      "Build a defensible quantitative equity ranking system that wins on signal strength, alpha magnitude, AND compute efficiency - without sacrificing one for another.",
    role:
      "Co-built the modeling pipeline, walk-forward validation framework, and the multi-axis evaluation framework that drove the strategic recommendation.",
    approach:
      "Evaluated XGBoost-based learning-to-rank, MLP, ensemble stacking, and gated agreement models on 108 firm characteristics across 192 out-of-sample months (1981-2021), spanning 5 SIC industry groups. Used walk-forward validation, Rank IC as the primary signal metric, Top-5 spread as the alpha metric, and compute time as the efficiency metric. Compared models on a normalized radar across all axes rather than picking a single winner.",
    tools: [
      "Python",
      "XGBoost",
      "scikit-learn",
      "Learning-to-rank",
      "Walk-forward validation",
      "Pandas",
    ],
    output:
      "Three strategically distinct models - XGB_RANK_R3_BEST (signal: 0.0289 Rank IC), AGREE_S1 (alpha: 0.0743 Top-5 spread), XGB_S5A (efficiency leader) - with a recommended two-layer architecture combining XGBoost ranking and AGREE conviction filtering.",
    impact:
      "Reframed equity model selection as a multi-axis trade-off, not a leaderboard. Showed that strategic combination of complementary models can outperform any single best-in-axis pick.",
    skills: [
      "Quantitative finance",
      "Learning-to-rank",
      "Walk-forward backtesting",
      "Multi-axis model evaluation",
      "Feature engineering",
    ],
    confidentiality: null,
    tier: "Academic",
    tierLabel: "Academic · Purdue MSBAIM",
    tags: ["Academic", "Data Science", "Strategy"],
    accent: "lime",
    badge: null,
    metric: { label: "Backtest", value: "192 months · 1981-2021" },
    image: "/screenshots/alpha-stock.jpg",
    repoUrl: "https://github.com/ramanaprabhusana/alpha-stock-gating-model",
  },
];
