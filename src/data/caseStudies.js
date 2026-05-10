export const caseStudyTags = [
  "Forecasting",
  "Healthcare",
  "BI",
  "Automation",
  "Consulting",
  "Strategy",
  "Business Analytics",
  "Data Science",
  "Sports Analytics",
  "Retail",
  "Pricing",
];

export const caseStudies = [
  {
    id: "model-hub",
    title: "Reusable Forecasting and Decision Model Hub",
    valueProp:
      "Designed a transparent, audit-ready model hub connecting evidence, assumptions, BI data, and forecast outputs.",
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
    tags: ["Forecasting", "Healthcare", "Consulting", "Strategy", "Business Analytics"],
    accent: "lime",
    badge: null,
    repoUrl: "https://github.com/ramanaprabhusana/epidemiology-data-tool",
  },
  {
    id: "evidence-pipeline",
    title: "Healthcare Evidence and Epidemiology Analytics Pipeline",
    valueProp:
      "Built defensible, source-linked assumptions for forecasting and decision support.",
    context: "ZS Associates · Decision Analytics",
    problem:
      "Need to consolidate and validate healthcare assumptions for forecasting and decision support.",
    role:
      "Owned the assumption pipeline - sourcing, validating, and converting evidence into model-ready inputs.",
    approach:
      "Pulled public data sources, mapped evidence to forecast levers, ran epidemiology and incidence projections, applied age-period-cohort thinking, and used weighted least squares with confidence intervals to land on treated and addressable population estimates.",
    tools: ["Excel", "Forecasting model design", "Evidence mapping", "Source documentation"],
    output:
      "Source-linked assumption set ready to feed downstream forecast models.",
    impact:
      "Built defensible, source-linked assumptions that held up to client and internal review.",
    skills: [
      "Epidemiology assumptions",
      "Evidence synthesis",
      "Forecasting inputs",
      "Healthcare analytics",
    ],
    confidentiality: "Details generalized to protect sensitive information.",
    tags: ["Forecasting", "Healthcare", "Consulting"],
    accent: "rose",
    badge: null,
    repoUrl: null,
  },
  {
    id: "commercial-forecasting",
    title: "Commercial Forecasting for Launch and Portfolio Strategy",
    valueProp:
      "Forecast scenarios that supported launch planning, portfolio decisions, and revenue outlook for a $1.2Bn lung cancer asset.",
    context: "Novartis · Senior Lead Analyst",
    problem:
      "Commercial teams needed forecast scenarios to support launch planning, portfolio decisions, and revenue outlook.",
    role:
      "Designed and owned the patient-funnel-based forecast model and stakeholder narrative.",
    approach:
      "Built a patient funnel, layered market assumptions, ran scenarios, and aligned the revenue forecast with cross-functional input. Tracked forecast accuracy and translated findings into stakeholder decisions.",
    tools: ["Excel", "Forecasting models", "Syndicated data", "Scenario planning"],
    output:
      "Decision-ready forecast model with scenario layers, revenue outlook, and an executive narrative.",
    impact:
      "Supported strategic launch discussions and portfolio decision-making for a $1.2Bn asset.",
    skills: [
      "Patient-based forecasting",
      "Scenario analysis",
      "Stakeholder narrative",
      "Launch strategy",
    ],
    confidentiality: "Details generalized to protect business-sensitive information.",
    tags: ["Forecasting", "Healthcare", "Strategy", "Consulting"],
    accent: "cyan",
    badge: null,
    repoUrl: null,
  },
  {
    id: "ma-dashboard",
    title: "Scenario-Ready M&A Forecasting Dashboard",
    valueProp:
      "Built a forecast model and Tableau dashboard supporting a $3.5Bn M&A evaluation in multiple myeloma.",
    context: "ZS Associates · Decision Analytics",
    problem:
      "Leadership needed a structured view of commercial opportunity for a high-value asset under deal evaluation.",
    role:
      "Built the forecast model end-to-end and the Tableau dashboard layered on top.",
    approach:
      "Combined market research, forecast modeling, and Tableau scenario toggles. Added sensitivity analysis on the inputs that mattered most so the deal team could explore upside, base, and downside in real time.",
    tools: ["Tableau", "Excel", "Scenario modeling", "Market research"],
    output:
      "Tableau dashboard with scenario toggles, sensitivity views, and a forecast model spine.",
    impact: "Improved decision clarity for a $3.5Bn strategic asset evaluation.",
    skills: [
      "M&A analytics",
      "Scenario modeling",
      "Dashboarding",
      "Market research",
    ],
    confidentiality: "Details generalized to protect client-sensitive information.",
    tags: ["Forecasting", "BI", "Strategy", "Healthcare", "Consulting"],
    accent: "violet",
    badge: null,
    repoUrl: null,
  },
  {
    id: "automation",
    title: "Forecast Submission Automation and Model Governance",
    valueProp:
      "Reconfigured a VBA-based forecasting submission tool that enabled on-time global oncology submissions and reduced subcontracting costs.",
    context: "Novartis · Business Analyst",
    problem:
      "Manual forecast submissions create risk, delays, and inconsistent outputs.",
    role: "Owned the rebuild of the VBA submission workflow and validation logic.",
    approach:
      "Reconfigured the macro layer, added validation checks, standardized the template, and tightened the submission workflow so cycles ran predictably.",
    tools: ["Excel", "VBA", "Macros", "QA logic"],
    output:
      "Standardized template + macro suite + validation checks running across the global oncology portfolio.",
    impact:
      "Improved reliability, on-time delivery, and operational efficiency; cut subcontracting cost.",
    skills: ["Excel VBA", "Process automation", "Model governance", "QA"],
    confidentiality: null,
    tags: ["Automation", "Forecasting", "Healthcare"],
    accent: "amber",
    badge: null,
    repoUrl: null,
  },
  {
    id: "multimodal-retail",
    title: "Multimodal Retail Predictive ML",
    valueProp:
      "Hybrid model combining vision-language attributes with classical ML to rank retail SKUs for promotion under fixed ad budget - outperformed LLM-only by ~3× on profit.",
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
    tags: ["Data Science", "Retail", "Pricing", "Business Analytics", "Strategy"],
    accent: "violet",
    badge: "Purdue MSBAIM",
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
    tags: ["Data Science", "Sports Analytics", "Strategy"],
    accent: "cyan",
    badge: "3rd of 83 - Kaggle 2026",
    repoUrl: "https://github.com/ramanaprabhusana/ncaa-final-four-analytics-2026",
    competitionUrl: "https://www.kaggle.com/competitions/final-four-analytics-challenge-26",
  },
  {
    id: "krenicki-ai-finance",
    title: "Multi-Agent AI for SAP Financial Process Transformation",
    valueProp:
      "Multi-agent AI framework inside SAP S/4HANA to automate receivables matching, dispute resolution, and behavioral risk insights - designed to reduce manual AR investigation effort by up to 90%.",
    context:
      "Purdue Krenicki Center for Business Analytics & Machine Learning × Accenture · Boiler Strategy Group · Faculty advisor: Prof. Davi Moreira · Presented at the AI Showcase, March 2026.",
    problem:
      "Manual data entry and reactive dispute management create significant inefficiencies in traditional Accounts Receivable operations for large retail enterprises: high-volume manual matching, reactive dispute handling, and judgment-heavy risk segmentation delay cash collection and inflate operational cost.",
    role:
      "Co-designed the multi-agent AI architecture and the before-vs-after process flows that translate manual L5 process steps into agent-driven workflows.",
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
    tags: ["Data Science", "Automation", "Consulting", "Strategy", "Business Analytics"],
    accent: "violet",
    badge: "Krenicki × Accenture",
    repoUrl: null,
  },
  {
    id: "ufc-visual-analytics",
    title: "UFC Global Knockout Tour Visual Analytics",
    valueProp:
      "Designed a data-driven UFC \"Global Knockout Tour\" - five global cities, optimal fight cards, and ROI estimates - for an Executive Pitch.",
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
    tags: ["Sports Analytics", "BI", "Strategy", "Business Analytics"],
    accent: "amber",
    badge: "Purdue MGMT 59000",
    repoUrl: "https://github.com/ramanaprabhusana/ufc-global-knockout-visual-analytics",
  },
];
