import type { ProjectSlug } from "@/lib/constants";

export interface ConstellationEdge {
  from: ProjectSlug;
  to: ProjectSlug;
  sharedTech: string[];
  weight: 1 | 2 | 3;
}

export const constellationEdges: ConstellationEdge[] = [
  {
    from: "the-masjid",
    to: "t-trac",
    sharedTech: ["Anthropic API", "Pinecone", "RAG"],
    weight: 3,
  },
  {
    from: "t-trac",
    to: "vizionfit-pro",
    sharedTech: ["Supabase", "React Native", "Mobile-first"],
    weight: 3,
  },
  {
    from: "the-masjid",
    to: "vizionfit-pro",
    sharedTech: ["Anthropic API", "AI integration"],
    weight: 2,
  },
];
