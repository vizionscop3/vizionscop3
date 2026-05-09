import type { ConstellationEdge } from "@/lib/projects/constellation";
import { constellationEdges } from "@/lib/projects/constellation";
import type { Project } from "@/lib/projects/types";
import { TechStackHoverTrigger } from "@/components/work/TechStackHoverTrigger";

export function ConstellationMobile({ projects }: { projects: Project[] }) {
  return (
    <div className="flex flex-col gap-6 md:hidden">
      {projects.map((p) => (
        <div key={p.slug} className="rounded-lg border border-[var(--color-void-gray)] bg-[var(--color-midnight)] p-4">
          <p className="font-display text-lg font-semibold text-[var(--color-signal-white)]">
            {p.name}
          </p>
          <p className="mt-1 text-sm text-[var(--color-echo-gray)]">{p.tagline}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {constellationEdges
              .filter((e) => e.from === p.slug || e.to === p.slug)
              .flatMap((e: ConstellationEdge) => e.sharedTech)
              .filter((t, i, arr) => arr.indexOf(t) === i)
              .map((tech) => (
                <span
                  key={tech}
                  className="rounded-sm border border-[var(--color-void-gray)] px-2 py-0.5 text-[10px] font-mono uppercase tracking-wide text-[var(--color-echo-gray)]"
                  title={tech}
                >
                  {tech}
                </span>
              ))}
          </div>
          <div className="mt-4 flex justify-start">
            <TechStackHoverTrigger project={p} />
          </div>
        </div>
      ))}
      <p className="sr-only">
        Project list for screen readers:{" "}
        {projects.map((p) => `${p.name}: ${p.tagline}`).join(". ")}
      </p>
    </div>
  );
}
