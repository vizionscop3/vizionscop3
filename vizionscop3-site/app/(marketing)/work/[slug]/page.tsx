import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { CountUp } from "@/components/motion/CountUp";
import { NextProjectNav } from "@/components/work/NextProjectNav";
import { TechStackBadges } from "@/components/work/TechStackBadges";
import { PROJECT_SLUGS, siteConfig } from "@/lib/constants";
import { getProjectBySlug } from "@/lib/projects/data";
import { creativeWorkJsonLd } from "@/lib/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return PROJECT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return buildMetadata({
      title: "Project — VizionScop3",
      description: siteConfig.description,
      path: `/work/${slug}`,
    });
  }
  return buildMetadata({
    title: project.metaTitle ?? project.name,
    description: project.metaDescription ?? project.tagline,
    path: `/work/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const url = `${siteConfig.url}/work/${project.slug}`;
  const jsonLd = creativeWorkJsonLd({
    name: project.name,
    description: project.description,
    url,
  });

  const leadPrivacy =
    project.slug === "t-trac"
      ? "Health-adjacent data is modeled with privacy as a first constraint — not a late add-on."
      : project.challenge;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Section className="pt-8">
        <Container className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge tone="cyan">{project.status}</Badge>
              {project.platform.map((p) => (
                <Badge key={p} tone="default">
                  {p}
                </Badge>
              ))}
            </div>
            <Heading level="1" className="mt-6 text-[var(--color-signal-white)]">
              {project.name}
            </Heading>
            <p className="mt-4 text-lg text-[var(--color-echo-gray)]">{project.tagline}</p>
            <p className="mt-6 text-[var(--color-echo-gray)]">{project.description}</p>
          </div>
          <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-lg border border-[var(--color-void-gray)]">
            <Image
              src={project.heroImage.src}
              alt={project.heroImage.alt}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
              quality={85}
              unoptimized={project.heroImage.src.endsWith(".svg")}
            />
          </div>
        </Container>
      </Section>
      <Section className="bg-[var(--color-deep-space)]">
        <Container>
          <Heading level="2" className="text-[var(--color-signal-white)]">
            At a glance
          </Heading>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-lg border border-[var(--color-void-gray)] bg-[var(--color-midnight)] p-4"
              >
                <p className="text-xs font-mono uppercase tracking-wide text-[var(--color-echo-gray)]">
                  {m.label}
                </p>
                <p className="mt-2 font-display text-2xl font-semibold text-[var(--color-signal-white)]">
                  {project.slug === "the-masjid" && m.label === "Hadiths indexed" ? (
                    <CountUp end={36313} suffix="+" ariaLabel="Hadiths indexed" />
                  ) : (
                    m.value
                  )}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <Section>
        <Container className="space-y-6">
          <Heading level="2" className="text-[var(--color-signal-white)]">
            Why this exists
          </Heading>
          <p className="text-[var(--color-echo-gray)]">{leadPrivacy}</p>
        </Container>
      </Section>
      <Section className="bg-[var(--color-deep-space)]">
        <Container className="space-y-6">
          <Heading level="2" className="text-[var(--color-signal-white)]">
            How it is built
          </Heading>
          <p className="text-[var(--color-echo-gray)]">{project.approach}</p>
          <div className="rounded-lg border border-[var(--color-void-gray)] bg-[var(--color-obsidian)] p-6">
            <svg viewBox="0 0 600 220" className="h-auto w-full" role="img">
              <title>{project.architectureCaption}</title>
              <rect
                x="40"
                y="40"
                width="140"
                height="60"
                rx="8"
                fill="var(--color-midnight)"
                stroke="var(--color-void-gray)"
              />
              <text x="110" y="75" textAnchor="middle" fill="var(--color-echo-gray)" fontSize="14" fontFamily="var(--font-mono)">
                Client
              </text>
              <rect
                x="230"
                y="40"
                width="140"
                height="60"
                rx="8"
                fill="var(--color-midnight)"
                stroke="var(--color-electric-cyan)"
              />
              <text x="300" y="75" textAnchor="middle" fill="var(--color-signal-white)" fontSize="14" fontFamily="var(--font-mono)">
                APIs
              </text>
              <rect
                x="420"
                y="40"
                width="140"
                height="60"
                rx="8"
                fill="var(--color-midnight)"
                stroke="var(--color-void-gray)"
              />
              <text x="490" y="75" textAnchor="middle" fill="var(--color-echo-gray)" fontSize="14" fontFamily="var(--font-mono)">
                Data / RAG
              </text>
              <path d="M180 70 L230 70" stroke="var(--color-echo-gray)" strokeWidth="2" />
              <path d="M370 70 L420 70" stroke="var(--color-echo-gray)" strokeWidth="2" />
              <path d="M300 100 L300 150 L490 150 L490 100" stroke="var(--color-void-gray)" strokeWidth="1" fill="none" />
            </svg>
            <p className="mt-4 text-sm text-[var(--color-echo-gray)]">
              {project.architectureCaption}
            </p>
          </div>
        </Container>
      </Section>
      <Section>
        <Container className="space-y-6">
          <Heading level="2" className="text-[var(--color-signal-white)]">
            Screens
          </Heading>
          <div className="grid gap-6 md:grid-cols-2">
            {project.galleryImages.map((img) => (
              <figure key={img.src} className="space-y-2">
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-[var(--color-void-gray)]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 560px, (min-width: 768px) 45vw, 100vw"
                    quality={85}
                    unoptimized={img.src.endsWith(".svg")}
                  />
                </div>
                {img.caption ? (
                  <figcaption className="text-sm text-[var(--color-echo-gray)]">
                    {img.caption}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </Container>
      </Section>
      <Section className="bg-[var(--color-deep-space)]">
        <Container className="space-y-4">
          <Heading level="2" className="text-[var(--color-signal-white)]">
            Outcome
          </Heading>
          <p className="text-[var(--color-echo-gray)]">{project.outcome}</p>
        </Container>
      </Section>
      <Section>
        <Container className="space-y-4">
          <Heading level="2" className="text-[var(--color-signal-white)]">
            Stack
          </Heading>
          <TechStackBadges project={project} />
        </Container>
      </Section>
      <Section>
        <Container>
          <NextProjectNav current={project.slug} />
        </Container>
      </Section>
    </>
  );
}
