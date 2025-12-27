export const profile = {
  name: "Ramana Prabhu Sana",
  headline: "MSBAIM (Purdue). Pharma forecasting, analytics, and automation.",
  location: "West Lafayette, IN",
  email: "rsana@purdue.edu",
  phone: "",
  links: {
    resumeUrl: "/Resume.pdf",
    linkedin: "https://www.linkedin.com/in/ramanaprabhusana/",
    github: "https://github.com/ramanaprabhusana",
  },

  hero: {
    intro:
      "I build decision-ready analytics products. Forecasting models, automation, and AI workflows that are clean, explainable, and practical.",
    badges: ["Pharma forecasting", "Excel + VBA", "Python + SQL", "Automation mindset"],
    ctas: [
      { label: "Contact", href: "#contact", variant: "primary" },
      { label: "Resume", href: "/Resume.pdf", variant: "secondary" },
    ],
  },

  about: {
    title: "About",
    body: [
      "I am a pharma forecasting and analytics professional with experience building scalable models, automating Excel workflows, and creating stakeholder-ready dashboards.",
      "I am currently pursuing MSBAIM at Purdue and seeking internship and full-time opportunities in analytics and consulting.",
    ],
    highlights: [
      "Forecast model build and review (marketed and pipeline)",
      "Scenario planning, sensitivities, and model governance",
      "Automation to reduce manual recurring work",
    ],
  },

  experience: [
    {
      company: "Novartis",
      role: "Senior Lead Analyst",
      location: "",
      dates: "Jul 2023 – Jul 2025",
      bullets: [
        "Led forecasting and decision support for strategic planning and portfolio discussions.",
        "Built scalable models and improved reporting workflows for stakeholders.",
      ],
      tags: ["Forecasting", "Excel", "Stakeholder reporting"],
    },
    {
      company: "Novartis",
      role: "Lead Analyst",
      location: "",
      dates: "Oct 2022 – Jul 2023",
      bullets: ["Built global forecasting workflows and Power BI reporting for leadership updates."],
      tags: ["Forecasting", "Power BI"],
    },
    {
      company: "ZS Associates",
      role: "Decision Analytics Associate",
      location: "",
      dates: "Jul 2019 – Dec 2020",
      bullets: ["Built forecast models and dashboards for healthcare clients."],
      tags: ["Analytics", "Forecasting"],
    },
  ],

  education: [
    {
      school: "Purdue University (Daniels School of Business)",
      degree: "MS Business Analytics & Information Management (MSBAIM)",
      location: "West Lafayette, IN",
      dates: "2025 – 2026",
      bullets: ["Track focus: Consulting and Data Science."],
    },
  ],

  skills: {
    groups: [
      { title: "Core", items: ["Forecasting", "Scenario analysis", "Model governance", "Storytelling", "Decision support"] },
      { title: "Tools", items: ["Excel", "VBA", "Python", "SQL", "Power BI", "Tableau", "Git"] },
      { title: "Cloud", items: ["AWS fundamentals", "IAM basics", "S3 basics"] },
    ],
  },

  projects: [
    {
      title: "Forecasting Model and Reporting",
      subtitle: "Standardized forecasting workflow and KPI reporting.",
      description:
        "Standardized forecasting workflow and stakeholder-ready KPI reporting to improve clarity and repeatability.",
      tags: ["Forecasting", "Excel", "Power BI"],
      links: { github: "", live: "" },
    },
    {
      title: "Excel VBA Automation",
      subtitle: "Automation and validation checks for recurring submissions.",
      description:
        "Improved recurring model submissions using VBA automation and validation checks to reduce manual effort.",
      tags: ["VBA", "Automation", "Governance"],
      links: { github: "", live: "" },
    },
  ],
};
