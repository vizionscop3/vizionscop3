import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Globe,
  Smartphone,
  Code,
  Database,
  Cpu,
  Lightbulb,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { servicesData, ServiceSlug } from "@/lib/services-data";
import { generatePageMetadata, generateServiceJsonLd } from "@/lib/seo";

const iconMap = {
  "web-development": Globe,
  "mobile-development": Smartphone,
  "custom-software": Code,
  "database-engineering": Database,
  "ai-infrastructure": Cpu,
  "technology-consulting": Lightbulb,
};

const colorMap: Record<string, string> = {
  "web-development": "var(--color-electric-cyan)",
  "mobile-development": "var(--color-plasma-violet)",
  "custom-software": "var(--color-circuit-green)",
  "database-engineering": "var(--color-solar-gold)",
  "ai-infrastructure": "var(--color-electric-cyan)",
  "technology-consulting": "var(--color-plasma-violet)",
};

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug as ServiceSlug];

  if (!service) return {};

  return generatePageMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${slug}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesData[slug as ServiceSlug];

  if (!service) notFound();

  const Icon = iconMap[slug as ServiceSlug];
  const color = colorMap[slug] || "var(--color-electric-cyan)";

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateServiceJsonLd(
              service.title,
              service.description,
              service.title
            )
          ),
        }}
      />

      {/* Hero */}
      <Section spacing="lg" className="pt-32">
        <Container>
          <FadeIn className="mx-auto max-w-4xl">
            <Link
              href="/services"
              className="mb-6 inline-flex items-center text-sm text-[var(--color-echo-gray)] transition-colors hover:text-[var(--color-electric-cyan)]"
            >
              ← Back to Services
            </Link>

            <div
              className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-[var(--radius-lg)]"
              style={{
                backgroundColor: `color-mix(in srgb, ${color} 20%, transparent)`,
              }}
            >
              <Icon className="h-8 w-8" style={{ color }} />
            </div>

            <Heading as="h1" size="hero" className="mb-4">
              {service.title}
            </Heading>
            <p className="mb-4 text-xl font-medium" style={{ color }}>
              {service.tagline}
            </p>
            <p className="text-lg text-[var(--color-echo-gray)]">
              {service.description}
            </p>
          </FadeIn>
        </Container>
      </Section>

      {/* Features & Technologies */}
      <Section spacing="md">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Features */}
            <FadeIn>
              <h2 className="mb-6 font-[var(--font-display)] text-2xl font-semibold text-[var(--color-signal-white)]">
                What We Deliver
              </h2>
              <Stagger className="space-y-4">
                {service.features.map((feature, idx) => (
                  <StaggerItem
                    key={idx}
                    className="flex items-start gap-3 rounded-[var(--radius-md)] border border-[var(--color-void-gray)]/50 bg-[var(--color-deep-space)] p-4"
                  >
                    <CheckCircle
                      className="mt-0.5 h-5 w-5 shrink-0"
                      style={{ color }}
                    />
                    <span className="text-[var(--color-signal-white)]">
                      {feature}
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>
            </FadeIn>

            {/* Technologies */}
            <FadeIn delay={0.1}>
              <h2 className="mb-6 font-[var(--font-display)] text-2xl font-semibold text-[var(--color-signal-white)]">
                Technologies We Use
              </h2>
              <div className="flex flex-wrap gap-3">
                {service.technologies.map((tech, idx) => (
                  <Badge key={idx} variant="outline" className="text-sm">
                    {tech}
                  </Badge>
                ))}
              </div>

              {/* Case Study Preview */}
              {service.caseStudyPreview && (
                <div className="mt-8 rounded-[var(--radius-lg)] border border-[var(--color-void-gray)]/50 bg-[var(--color-deep-space)] p-6">
                  <p className="mb-2 text-sm font-medium uppercase tracking-wider text-[var(--color-echo-gray)]">
                    Recent Result
                  </p>
                  <h3 className="mb-2 text-lg font-semibold text-[var(--color-signal-white)]">
                    {service.caseStudyPreview.title}
                  </h3>
                  <p className="text-2xl font-bold" style={{ color }}>
                    {service.caseStudyPreview.result}
                  </p>
                </div>
              )}
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section spacing="lg">
        <Container>
          <FadeIn className="mb-12 text-center">
            <Heading as="h2" size="lg" className="mb-4">
              Our Process
            </Heading>
            <p className="mx-auto max-w-2xl text-[var(--color-echo-gray)]">
              A proven methodology that ensures successful project delivery.
            </p>
          </FadeIn>

          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, idx) => (
              <StaggerItem key={idx}>
                <div className="relative h-full rounded-[var(--radius-lg)] border border-[var(--color-void-gray)]/50 bg-[var(--color-deep-space)] p-6">
                  <div
                    className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${color} 20%, transparent)`,
                      color,
                    }}
                  >
                    {idx + 1}
                  </div>
                  <h3 className="mb-2 font-[var(--font-display)] text-lg font-semibold text-[var(--color-signal-white)]">
                    {step.step}
                  </h3>
                  <p className="text-sm text-[var(--color-echo-gray)]">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* CTA */}
      <Section spacing="lg">
        <Container>
          <FadeIn>
            <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-void-gray)]/50 bg-gradient-to-br from-[var(--color-deep-space)] to-[var(--color-midnight)] p-8 md:p-12">
              <div className="relative z-10 mx-auto max-w-2xl text-center">
                <Heading as="h2" size="lg" className="mb-4">
                  Ready to get started?
                </Heading>
                <p className="mb-8 text-lg text-[var(--color-echo-gray)]">
                  Let&apos;s discuss how we can help with your {service.title.toLowerCase()} needs.
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Button asChild size="lg">
                    <Link href="/contact">
                      Start a Project
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/work">View Related Work</Link>
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}
