import type { Project } from "@/lib/projects/types";

export function TechStackBadges({ project }: { project: Project }) {
  const pairs = project.techStack.flatMap((stack) =>
    stack.technologies.map((t) => ({
      key: `${stack.category}-${t}`,
      label: t,
      tooltip: stack.tooltip,
    })),
  );
  return (
    <ul className="flex flex-wrap gap-2">
      {pairs.map((p) => (
        <li key={p.key}>
          <span
            title={p.tooltip ?? p.label}
            className="inline-flex rounded-sm border border-[var(--color-void-gray)] bg-[var(--color-deep-space)] px-2 py-1 font-mono text-[11px] uppercase tracking-wide text-[var(--color-echo-gray)]"
          >
            {p.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
