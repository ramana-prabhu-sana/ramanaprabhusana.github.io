export const decisionProblems = [
  {
    id: "opportunity-size",
    icon: "Target",
    accent: "lime",
    question: "How large is the opportunity?",
    help:
      "I size markets and segments by triangulating evidence, building patient or customer funnels, and laying out the math for stakeholders to challenge.",
    tools: ["Excel", "SQL", "Market sizing", "Patient funnel"],
  },
  {
    id: "drivers",
    icon: "Sliders",
    accent: "cyan",
    question: "Which assumptions or drivers matter most?",
    help:
      "I structure, document, and validate assumptions so teams can understand which inputs matter most and how scenario changes affect outputs.",
    tools: ["Excel", "SQL", "Python", "Sensitivity analysis", "Scenario modeling", "Dashboarding"],
  },
  {
    id: "scenarios",
    icon: "GitBranch",
    accent: "violet",
    question: "What happens under different business scenarios?",
    help:
      "I build scenario layers - base, upside, downside - and surface the inflection points that change a decision.",
    tools: ["Excel", "Tableau", "Power BI", "Scenario tables"],
  },
  {
    id: "perf-gaps",
    icon: "AlertCircle",
    accent: "rose",
    question: "Where are the performance gaps?",
    help:
      "I compare actuals to plan, decompose variance by driver, and tell the story of what changed - and why it matters.",
    tools: ["SQL", "Power BI", "Variance analysis", "KPI tracking"],
  },
  {
    id: "where-to-focus",
    icon: "Map",
    accent: "amber",
    question: "Which markets, brands, products, teams, or segments need attention?",
    help:
      "I rank entities on shared metrics, surface outliers, and translate the ranking into a prioritized action list.",
    tools: ["Python", "SQL", "Tableau", "Segmentation", "Prioritization frameworks"],
  },
  {
    id: "automate-reporting",
    icon: "Zap",
    accent: "lime",
    question: "How can reporting be automated?",
    help:
      "I rewire recurring reports with VBA, Python, or Power Query so the team's time goes to insight, not formatting.",
    tools: ["Excel", "VBA", "Python", "Power Query", "QA checks"],
  },
  {
    id: "leadership-dashboards",
    icon: "LayoutDashboard",
    accent: "cyan",
    question: "How can dashboards better support leadership decisions?",
    help:
      "I redesign dashboards around the decisions they should drive - fewer charts, sharper narratives, clearer 'so what'.",
    tools: ["Power BI", "Tableau", "Qlik Sense", "Information design"],
  },
  {
    id: "model-governance",
    icon: "ShieldCheck",
    accent: "violet",
    question: "How can models become more transparent and reusable?",
    help:
      "I refactor monolithic workbooks into hub-and-spoke structures with documented assumptions, validation checks, and version notes.",
    tools: ["Excel", "VBA", "Python", "Model governance"],
  },
  {
    id: "resource-prio",
    icon: "Users",
    accent: "rose",
    question: "How should resources be prioritized?",
    help:
      "I model trade-offs across teams, accounts, or regions and surface where one extra dollar (or hour) creates the most value.",
    tools: ["Excel", "Python", "Optimization basics", "Scenario planning"],
  },
  {
    id: "raw-to-recommendation",
    icon: "Send",
    accent: "amber",
    question: "How can raw data become a clear business recommendation?",
    help:
      "I move from data → analysis → narrative → recommendation, designing each layer so the next one is easy to act on.",
    tools: ["SQL", "Python", "Storytelling", "Executive narrative"],
  },
];
