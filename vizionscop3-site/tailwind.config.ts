import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "var(--color-obsidian)",
        "deep-space": "var(--color-deep-space)",
        midnight: "var(--color-midnight)",
        "electric-cyan": "var(--color-electric-cyan)",
        "plasma-violet": "var(--color-plasma-violet)",
        "solar-gold": "var(--color-solar-gold)",
        "circuit-green": "var(--color-circuit-green)",
        "signal-white": "var(--color-signal-white)",
        "echo-gray": "var(--color-echo-gray)",
        "void-gray": "var(--color-void-gray)",
        background: "var(--color-obsidian)",
        foreground: "var(--color-signal-white)",
        border: "var(--color-void-gray)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      spacing: {
        "1": "var(--space-1)",
        "2": "var(--space-2)",
        "3": "var(--space-3)",
        "4": "var(--space-4)",
        "6": "var(--space-6)",
        "8": "var(--space-8)",
        "12": "var(--space-12)",
        "16": "var(--space-16)",
        "24": "var(--space-24)",
        "32": "var(--space-32)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      transitionTimingFunction: {
        "out-expo": "var(--ease-out-expo)",
        "in-out-quart": "var(--ease-in-out-quart)",
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        normal: "var(--duration-normal)",
        slow: "var(--duration-slow)",
      },
      boxShadow: {
        "glow-cyan": "var(--shadow-glow-cyan)",
        "glow-violet": "var(--shadow-glow-violet)",
        "glow-gold": "var(--shadow-glow-gold)",
        elevation1: "var(--shadow-elevation-1)",
        elevation2: "var(--shadow-elevation-2)",
        elevation3: "var(--shadow-elevation-3)",
      },
    },
  },
  plugins: [],
};

export default config;
