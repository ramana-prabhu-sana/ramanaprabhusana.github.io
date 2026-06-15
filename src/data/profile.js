// Source of truth for personal info, links, and hero copy.
export const profile = {
  name: "Ramana Prabhu Sana",
  initials: "RPS",
  location: "East Hanover, New Jersey",
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

  status: "Open · Full-time, January 2027",

  // Surfaced in the hero subline and the RecruiterCTA section. Kept here
  // so updates flow to both places from one source of truth. Start date
  // already lives in the status pill so this line trims to location signal.
  availability: "US-based · open to relocate",

  // Breakdown that backs the 'Cross-domain ML portfolio' pill - rendered
  // as a small evidence line beneath the stat pills in the RecruiterCTA.
  domainBreakdown: ["Pharma", "Finance", "Retail", "Sports analytics"],

  targeting: [
    "Brand & Launch Analytics",
    "Decision Science",
    "Resource Optimization",
    "Consulting",
  ],

  hero: {
    eyebrow: "Purdue MSBAIM · East Hanover, New Jersey",
    headline: "7+ years in healthcare and pharma analytics. Now building machine learning and decision science at Purdue.",
    subheadline:
      "Pipeline valuation, launch analytics, brand performance, resource optimization.",
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
