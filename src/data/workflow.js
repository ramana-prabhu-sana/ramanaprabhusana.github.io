export const workflow = [
  {
    id: "question",
    icon: "HelpCircle",
    title: "Business Question",
    short: "Frame the decision",
    explanation:
      "Frame the business decision clearly before choosing tools or methods. Without a sharp question, models risk solving the wrong problem.",
    tools: ["Stakeholder interviews", "Decision framing", "INFORMS Business Problem Framing"],
    value:
      "Aligns the analytics effort with what leadership actually needs to decide.",
  },
  {
    id: "data",
    icon: "Database",
    title: "Data Sources",
    short: "Gather and assess",
    explanation:
      "Gather structured, messy, internal, external, or public data and understand its reliability, freshness, and gaps.",
    tools: ["SQL", "APIs", "Public datasets", "Syndicated data", "Manual extracts"],
    value:
      "Sets the trust ceiling for every downstream insight; quality in, quality out.",
  },
  {
    id: "assumptions",
    icon: "Sliders",
    title: "Assumptions",
    short: "Translate logic",
    explanation:
      "Translate business logic and evidence into documented, testable assumptions that anyone on the team can challenge.",
    tools: ["Excel", "Markdown decision logs", "Evidence mapping", "Sensitivity ranges"],
    value:
      "Makes the model defensible and reusable instead of a black box.",
  },
  {
    id: "model",
    icon: "Boxes",
    title: "Model or Analysis",
    short: "Build transparent",
    explanation:
      "Build transparent Excel, SQL, Python, or BI-ready analytics outputs that show their work and can be audited later.",
    tools: ["Excel", "Python", "SQL", "Pandas", "scikit-learn", "Recharts"],
    value:
      "Generates the numbers the business will rely on, with traceability built in.",
  },
  {
    id: "scenarios",
    icon: "GitBranch",
    title: "Scenarios",
    short: "Stress-test choices",
    explanation:
      "Evaluate sensitivity, risks, market changes, resource choices, or performance gaps. Surface what would have to be true for the answer to flip.",
    tools: ["Scenario tables", "Tornado charts", "Monte Carlo basics", "Tableau", "Power BI"],
    value:
      "Replaces a single-number answer with a range that supports real strategy conversations.",
  },
  {
    id: "dashboard",
    icon: "LayoutDashboard",
    title: "Dashboard",
    short: "Show the story",
    explanation:
      "Convert outputs into stakeholder-ready visual insights - only the metrics that change a decision, only the views that get acted on.",
    tools: ["Power BI", "Tableau", "Qlik Sense", "Recharts"],
    value:
      "Cuts the gap between analysis and the leader who has to choose.",
  },
  {
    id: "recommendation",
    icon: "Send",
    title: "Recommendation",
    short: "Drive the decision",
    explanation:
      "Support business decisions through clear communication, framed trade-offs, and a recommended next step - not just a chart.",
    tools: ["Executive narrative", "Slide storyboards", "Decision memos"],
    value:
      "Turns analytics work into action, the only outcome that actually matters.",
  },
];
