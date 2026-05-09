import type { ProjectTheme } from "@/lib/projects/types";
import type { ProjectSlug } from "@/lib/constants";

export const projectThemes: Record<ProjectSlug | "default", ProjectTheme> = {
  "the-masjid": {
    primary: "#10B981",
    accent: "#F59E0B",
    surface: "#0A1F1C",
    motion: "breathing",
  },
  "t-trac": {
    primary: "#0EA5E9",
    accent: "#00F0FF",
    surface: "#0A1929",
    motion: "precise",
  },
  "vizionfit-pro": {
    primary: "#EF4444",
    accent: "#FFB800",
    surface: "#1A0808",
    motion: "kinetic",
  },
  default: {
    primary: "#00F0FF",
    accent: "#7C3AED",
    surface: "#0A0A0F",
    motion: "normal",
  },
};
