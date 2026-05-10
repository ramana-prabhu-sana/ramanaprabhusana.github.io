export const framework = [
  {
    id: "frame",
    step: "01",
    title: "Frame the business question",
    what:
      "Sit with the business owner, restate the decision in one sentence, list the constraints that matter, and lock the success criteria before opening Excel.",
    why:
      "Most analytics work fails on the question, not the math. A precise question makes every downstream choice obvious.",
  },
  {
    id: "structure",
    step: "02",
    title: "Structure data and assumptions",
    what:
      "Map the data sources, document each assumption with evidence, separate inputs from logic, and tag everything that should later become a sensitivity lever.",
    why:
      "Stakeholders trust models they can challenge. Documentation is what turns a one-time deliverable into a reusable asset.",
  },
  {
    id: "build",
    step: "03",
    title: "Build transparent models or analytics outputs",
    what:
      "Develop in Excel, SQL, Python, or a BI tool with clean structure, named ranges, version control, and inline checks. No 'magic cells'.",
    why:
      "Future-you, your teammate, or an auditor should be able to trace any number back to its source in under a minute.",
  },
  {
    id: "validate",
    step: "04",
    title: "Validate scenarios, risks, and performance drivers",
    what:
      "Run sensitivity analysis on the inputs that matter, stress-test extremes, document what could go wrong, and compare to history or benchmarks.",
    why:
      "A single point estimate hides risk. Scenarios make trade-offs visible and protect leadership from being surprised.",
  },
  {
    id: "communicate",
    step: "05",
    title: "Communicate decision-ready insights",
    what:
      "Translate the model into a recommendation: what we found, what it means, what we'd do, and what we'd watch. Visuals serve the narrative.",
    why:
      "Analytics that don't make it to a decision don't count. Clear storytelling closes the loop.",
  },
];
