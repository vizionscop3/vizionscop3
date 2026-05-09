"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { ProjectSlug } from "@/lib/constants";
import { projectThemes } from "@/lib/projects/themes";

type ThemeCtx = {
  activeSlug: ProjectSlug | null;
  setTheme: (slug: ProjectSlug | null) => void;
};

const ThemeContext = createContext<ThemeCtx | null>(null);

function applyTheme(slug: ProjectSlug | null) {
  if (typeof document === "undefined") return;
  const theme = slug ? projectThemes[slug] : projectThemes.default;
  const root = document.documentElement;
  root.style.setProperty("--theme-primary", theme.primary);
  root.style.setProperty("--theme-accent", theme.accent);
  root.style.setProperty("--theme-surface", theme.surface);
  root.setAttribute("data-theme-morph", slug ? "on" : "off");
  if (slug) {
    root.setAttribute("data-theme", slug);
  } else {
    root.removeAttribute("data-theme");
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [activeSlug, setActiveSlugState] = useState<ProjectSlug | null>(null);

  const setTheme = useCallback((slug: ProjectSlug | null) => {
    setActiveSlugState(slug);
    applyTheme(slug);
  }, []);

  useEffect(() => {
    applyTheme(activeSlug);
  }, [activeSlug]);

  const value = useMemo(
    () => ({ activeSlug, setTheme }),
    [activeSlug, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function usePortfolioTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("usePortfolioTheme must be used within ThemeProvider");
  }
  return ctx;
}
