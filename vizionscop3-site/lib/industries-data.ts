export const industriesData = {
  nonprofit: {
    title: "Nonprofits",
    tagline: "Maximize impact, minimize overhead",
    description:
      "We believe every nonprofit deserves technology that amplifies their mission. From donor management to volunteer coordination, we build solutions that stretch every dollar further while measuring the metrics that matter to funders.",
    challenges: [
      "Limited budgets competing with enterprise software costs",
      "Volunteer and staff turnover creating knowledge gaps",
      "Multiple disconnected systems requiring manual data entry",
      "Difficulty demonstrating impact to donors and grant makers",
      "Legacy systems that don't scale with growth",
    ],
    solutions: [
      "Custom donor management platforms with automated cultivation workflows",
      "Volunteer coordination apps with scheduling and communication",
      "Impact dashboards that generate funder-ready reports",
      "CRM integrations that unify constituent data",
      "Grant management systems with deadline tracking",
      "Event management platforms with ticketing and check-in",
    ],
    results: [
      { metric: "45%", description: "Average increase in donor retention" },
      { metric: "60%", description: "Reduction in administrative overhead" },
      { metric: "3x", description: "Improvement in volunteer engagement" },
    ],
    cta: "Schedule a nonprofit consultation",
  },
  "small-business": {
    title: "Small Business",
    tagline: "Enterprise capabilities, startup budgets",
    description:
      "You shouldn't have to choose between powerful technology and staying profitable. We help small businesses implement the same solutions used by Fortune 500 companies—at a fraction of the cost and complexity.",
    challenges: [
      "Outgrowing spreadsheets but not ready for enterprise software",
      "Time spent on manual processes instead of growth",
      "Limited IT expertise to evaluate technology options",
      "Need to compete with larger competitors digitally",
      "Cash flow constraints making large upfront investments risky",
    ],
    solutions: [
      "Custom business applications that fit your exact workflow",
      "E-commerce platforms optimized for conversion",
      "Customer portals and self-service tools",
      "Process automation eliminating manual data entry",
      "Mobile apps for field teams and customer engagement",
      "Integration middleware connecting existing tools",
    ],
    results: [
      { metric: "40%", description: "Average time savings on operations" },
      { metric: "35%", description: "Improvement in customer satisfaction" },
      { metric: "2.5x", description: "Return on technology investment" },
    ],
    cta: "Get a free technology assessment",
  },
  corporate: {
    title: "Corporate",
    tagline: "Modernize without disruption",
    description:
      "Corporate technology transformation requires balancing innovation with stability. We help mid-market companies modernize legacy systems, integrate acquired businesses, and build competitive digital capabilities—without disrupting daily operations.",
    challenges: [
      "Legacy systems creating technical debt and security risks",
      "Siloed data preventing enterprise-wide insights",
      "M&A integration complexity",
      "Compliance requirements across multiple jurisdictions",
      "Talent shortage for specialized technical skills",
    ],
    solutions: [
      "Legacy modernization with zero-downtime migration",
      "Enterprise data platforms with unified analytics",
      "API-first architecture enabling system integration",
      "Compliance automation and audit trail systems",
      "Custom internal tools replacing spreadsheet chaos",
      "Staff augmentation for specialized projects",
    ],
    results: [
      { metric: "70%", description: "Faster data access across departments" },
      { metric: "50%", description: "Reduction in compliance preparation time" },
      { metric: "90%", description: "Decrease in manual reporting effort" },
    ],
    cta: "Schedule an executive briefing",
  },
  enterprise: {
    title: "Enterprise",
    tagline: "Innovation at scale",
    description:
      "Enterprise technology decisions have organization-wide implications. We partner with Fortune 500 companies on strategic initiatives—from AI/ML infrastructure to cloud-native transformations—bringing startup agility to enterprise rigor.",
    challenges: [
      "Scaling innovation while maintaining governance",
      "Multi-cloud complexity and vendor management",
      "AI/ML readiness and responsible deployment",
      "Global team coordination and knowledge management",
      "Security and compliance at scale",
    ],
    solutions: [
      "AI/ML infrastructure and model deployment pipelines",
      "Multi-cloud architecture and optimization",
      "Enterprise RAG systems for knowledge management",
      "Custom internal tooling and developer platforms",
      "Security architecture reviews and implementation",
      "Digital transformation strategy and execution",
    ],
    results: [
      { metric: "85%", description: "Reduction in ML model deployment time" },
      { metric: "$2M+", description: "Annual cloud cost optimization" },
      { metric: "99.99%", description: "System availability maintained" },
    ],
    cta: "Request a capabilities presentation",
  },
};

export type IndustrySlug = keyof typeof industriesData;
