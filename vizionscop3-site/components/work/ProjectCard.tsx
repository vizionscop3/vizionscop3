import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Project } from "@/lib/projects/types";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const statusTone =
    project.status === "live"
      ? "green"
      : project.status === "beta"
        ? "gold"
        : "violet";

  return (
    <Card
      className={cn(
        "group flex h-full min-h-0 flex-col gap-4 transition-transform duration-[var(--duration-normal)] hover:-translate-y-1",
        className,
      )}
    >
      <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-md border border-[var(--color-void-gray)]">
        <Image
          src={project.heroImage.src}
          alt={project.heroImage.alt}
          fill
          className="object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-[1.02]"
          sizes="(min-width: 1280px) 400px, (min-width: 768px) 40vw, 100vw"
          quality={85}
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={statusTone}>{project.status.replace("-", " ")}</Badge>
        {project.filters.filter((f) => f !== "all").map((f) => (
          <Badge key={f} tone="default">
            {f}
          </Badge>
        ))}
      </div>
      <div>
        <h3 className="font-display text-xl font-semibold text-[var(--color-signal-white)]">
          {project.name}
        </h3>
        <p className="mt-2 text-sm text-[var(--color-echo-gray)]">
          {project.tagline}
        </p>
      </div>
      <Link
        href={`/work/${project.slug}`}
        className="mt-auto inline-flex min-h-11 items-center text-sm font-semibold text-[var(--color-electric-cyan)] underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric-cyan)]"
      >
        View case study →
      </Link>
    </Card>
  );
}
