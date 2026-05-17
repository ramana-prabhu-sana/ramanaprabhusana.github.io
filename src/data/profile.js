// Source of truth for personal info, links, and hero copy.
export const profile = {
  name: "Ramana Prabhu Sana",
  initials: "RPS",
  location: "West Lafayette, Indiana",
  email: "ramanaprabhu.sana@gmail.com",
  phone: "(347) 269-9365",

  links: {
    resume: "/Resume.pdf",
    linkedin: "https://www.linkedin.com/in/ramanaprabhusana/",
    github: "https://github.com/ramanaprabhusana",
    email: "mailto:ramanaprabhu.sana@gmail.com",
    calendly: "https://calendly.com/ramana_prabhu_sana/30min",
  },

  photo: "brand/profile.jpg",

  status: "Open to 2026 Opportunities",

  // Surfaced in the hero subline and the RecruiterCTA section. Kept here
  // so updates flow to both places from one source of truth.
  availability: "Full-time roles starting Jan 2027 · US-based · open to relocate",

  // Breakdown that backs the 'Cross-domain ML portfolio' pill - rendered
  // as a small evidence line beneath the stat pills in the RecruiterCTA.
  domainBreakdown: ["Pharma", "Finance", "Retail", "Sports analytics"],

  targeting: [
    "Brand & Launch Analytics",
    "Decision Science",
    "Resource Optimization",
    "Consulting",
  ],

  fields: [
    "Brand Performance",
    "Launch Analytics",
    "Pipeline Valuation",
    "Resource Optimization",
    "Decision Science",
    "Advanced Analytics",
  ],

  hero: {
    eyebrow: "Purdue MSBAIM · West Lafayette, Indiana · Open to 2026 Opportunities",
    headline: "Seven years of pharma commercial analytics. Now decision science at Purdue.",
    subheadline:
      "Pipeline valuation, launch analytics, brand performance, and resource optimization - built so leaders can act on the numbers, not just read them.",
    panelLabel: "Decision-ready analytics",
    toolStack: [
      "Excel",
      "VBA",
      "SQL",
      "Python",
      "XGBoost",
      "Power BI",
      "Tableau",
      "Streamlit",
    ],
  },
};
