import type { Service } from "@/lib/services/types";

export const services: Service[] = [
  {
    id: "web",
    name: "Web development",
    shortDescription: "Modern, performant websites and web applications.",
    icon: "Globe",
    order: 1,
  },
  {
    id: "mobile",
    name: "iOS and Android apps",
    shortDescription: "Native and cross-platform mobile experiences.",
    icon: "Smartphone",
    order: 2,
  },
  {
    id: "software",
    name: "Custom software",
    shortDescription: "Tailored systems built for your operations.",
    icon: "Code2",
    order: 3,
  },
  {
    id: "ai",
    name: "AI infrastructure",
    shortDescription: "RAG pipelines, vector search, and LLM integration.",
    icon: "Sparkles",
    order: 4,
  },
  {
    id: "database",
    name: "Database engineering",
    shortDescription: "Scalable data architecture, modeling, and analytics.",
    icon: "Database",
    order: 5,
  },
  {
    id: "consulting",
    name: "Technology consulting",
    shortDescription: "Strategic advisory for AI-native product delivery.",
    icon: "Compass",
    order: 6,
  },
];
