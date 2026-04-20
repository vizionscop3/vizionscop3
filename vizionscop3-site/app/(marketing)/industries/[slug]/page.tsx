import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Heart,
  Building,
  Building2,
  Landmark,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { industriesData, IndustrySlug } from "@/lib/industries-data";
import { generatePageMetadata } from "@/lib/seo";

const iconMap = {
  nonprofit: Heart,
  "small-business": Building,
  corporate: Building2,
  enterprise: Landmark,
};

const colorMap: Record<string, string> = {
  nonprofit: "var(--color-circuit-green)",
  "small-business": "var(--color-solar-gold)",
  corporate: "var(--color-plasma-violet)",
  enterprise: "var(--color-electric-cyan)",
};

export async function generateStaticParams() {
  return Object.keys(industriesData).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = industriesData[slug as IndustrySlug];

  if (!industry) return {};

  return generatePageMetadata({
    title: `${industry.title} Solutions`,
    description: industry.description,
    path: `/industries/${slug}`,
  });
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = industriesData[slug as IndustrySlug];

  if (!industry) notFound();

  const Icon = iconMap[slug as IndustrySlug];
  const color = colorMap[slug] || "var(--color-electric-cyan)";

  return (
    <>
      {/* Hero */}
      <Section spacing="lg" className="pt-32">
        <Container>
          <FadeIn className="mx-auto max-w-4xl">
            <Link
              href="/#who-we-serve"
              className="mb-6 inline-flex items-center text-sm text-[var(--color-echo-gray)] transition-colors hover:text-[var(--color-electric-cyan)]"
            >
              ← Back to Industries
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
              {industry.title}
            </Heading>
            <p className="mb-4 text-xl font-medium" style={{ color }}>
              {industry.tagline}
            </p>
            <p className="text-lg text-[var(--color-echo-gray)]">
              {industry.description}
            </p>
          </FadeIn>
        </Container>
      </Section>

      {/* Results */}
      <Section spacing="sm">
        <Container>
          <FadeIn>
            <div className="grid gap-6 md:grid-cols-3">
              {industry.results.map((result, idx) => (
                <div
                  key={idx}
                  className="rounded-[var(--radius-lg)] border border-[var(--color-void-gray)]/50 bg-[var(--color-deep-space)] p-6 text-center"
                >
                  <p
                    className="font-[var(--font-mono)] text-4xl font-bold md:text-5xl"
                    style={{ color }}
                  >
                    {result.metric}
                  </p>
                  <p className="mt-2 text-sm text-[var(--color-echo-gray)]">
                    {result.description}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Challenges & Solutions */}
      <Section spacing="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Challenges */}
            <FadeIn>
              <div className="mb-6 flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-[var(--color-solar-gold)]" />
                <h2 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-signal-white)]">
                  Challenges We Solve
                </h2>
              </div>
              <Stagger className="space-y-4">
                {industry.challenges.map((challenge, idx) => (
                  <StaggerItem
                    key={idx}
                    className="rounded-[var(--radius-md)] border border-[var(--color-void-gray)]/30 bg-[var(--color-deep-space)]/50 p-4"
                  >
                    <p className="text-[var(--color-echo-gray)]">{challenge}</p>
                  </StaggerItem>
                ))}
              </Stagger>
            </FadeIn>

            {/* Solutions */}
            <FadeIn delay={0.1}>
              <div className="mb-6 flex items-center gap-3">
                <TrendingUp className="h-6 w-6" style={{ color }} />
                <h2 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-signal-white)]">
                  Our Solutions
                </h2>
              </div>
              <Stagger className="space-y-4">
                {industry.solutions.map((solution, idx) => (
                  <StaggerItem
                    key={idx}
                    className="flex items-start gap-3 rounded-[var(--radius-md)] border border-[var(--color-void-gray)]/50 bg-[var(--color-deep-space)] p-4"
                  >
                    <CheckCircle
                      className="mt-0.5 h-5 w-5 shrink-0"
                      style={{ color }}
                    />
                    <span className="text-[var(--color-signal-white)]">
                      {solution}
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section spacing="lg">
        <Container>
          <FadeIn>
            <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-void-gray)]/50 bg-gradient-to-br from-[var(--color-deep-space)] to-[var(--color-midnight)] p-8 md:p-12">
              <div className="relative z-10 mx-auto max-w-2xl text-center">
                <Heading as="h2" size="lg" className="mb-4">
                  Ready to transform your {industry.title.toLowerCase()}?
                </Heading>
                <p className="mb-8 text-lg text-[var(--color-echo-gray)]">
                  {industry.cta}—no commitment required.
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Button asChild size="lg">
                    <Link href="/contact">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/services">Explore Services</Link>
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
