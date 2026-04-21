import { Metadata } from "next";
import Link from "next/link";
import {
  Globe,
  Smartphone,
  Code,
  Database,
  Cpu,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { generatePageMetadata, generateServiceJsonLd } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Services",
  description:
    "From web and mobile development to AI infrastructure, VizionScop3 delivers full-spectrum technology solutions for organizations of all sizes.",
  path: "/services",
});

const services = [
  {
    slug: "web-development",
    icon: Globe,
    title: "Web Development",
    tagline: "Performance-driven digital experiences",
    description:
      "Modern web applications built with React, Next.js, and progressive enhancement. From marketing sites to complex SaaS platforms.",
    features: [
      "Single-page & server-rendered applications",
      "E-commerce platforms",
      "Content management systems",
      "Progressive web apps (PWAs)",
    ],
    color: "var(--color-electric-cyan)",
  },
  {
    slug: "mobile-development",
    icon: Smartphone,
    title: "Mobile Development",
    tagline: "Native experiences, cross-platform efficiency",
    description:
      "iOS and Android applications using React Native and native SwiftUI/Kotlin. App Store optimization included.",
    features: [
      "Cross-platform development",
      "Native iOS & Android apps",
      "Offline-first architecture",
      "Push notifications & analytics",
    ],
    color: "var(--color-plasma-violet)",
  },
  {
    slug: "custom-software",
    icon: Code,
    title: "Custom Software",
    tagline: "Tailored solutions for unique challenges",
    description:
      "Bespoke enterprise software that fits your exact workflows. API development, integrations, and automation systems.",
    features: [
      "Enterprise applications",
      "API design & development",
      "System integrations",
      "Process automation",
    ],
    color: "var(--color-circuit-green)",
  },
  {
    slug: "database-engineering",
    icon: Database,
    title: "Database Engineering",
    tagline: "Architecture that scales with you",
    description:
      "PostgreSQL, MongoDB, Redis architecture designed for performance. Migrations, optimization, and disaster recovery.",
    features: [
      "Database design & modeling",
      "Performance optimization",
      "Migration & upgrades",
      "Backup & disaster recovery",
    ],
    color: "var(--color-solar-gold)",
  },
  {
    slug: "ai-infrastructure",
    icon: Cpu,
    title: "AI Infrastructure",
    tagline: "Deploy intelligence at scale",
    description:
      "Production-ready AI/ML pipelines, RAG systems, and LLM integrations. From proof-of-concept to enterprise deployment.",
    features: [
      "LLM integration & fine-tuning",
      "RAG system development",
      "ML pipeline orchestration",
      "AI-powered features",
    ],
    color: "var(--color-electric-cyan)",
  },
  {
    slug: "technology-consulting",
    icon: Lightbulb,
    title: "Technology Consulting",
    tagline: "Strategic guidance, practical outcomes",
    description:
      "Architecture reviews, tech stack recommendations, and digital transformation roadmaps. Fractional CTO services available.",
    features: [
      "Architecture reviews",
      "Tech stack assessment",
      "Digital transformation",
      "Fractional CTO services",
    ],
    color: "var(--color-plasma-violet)",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            services.map((service) =>
              generateServiceJsonLd(
                service.title,
                service.description,
                service.title
              )
            )
          ),
        }}
      />

      {/* Hero */}
      <Section spacing="lg" className="pt-32">
        <Container>
          <FadeIn className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-[var(--color-electric-cyan)]">
              Our Services
            </span>
            <Heading as="h1" size="hero" className="mb-6">
              Full-spectrum technology{" "}
              <span className="bg-gradient-to-r from-[var(--color-electric-cyan)] to-[var(--color-plasma-violet)] bg-clip-text text-transparent">
                solutions
              </span>
            </Heading>
            <p className="text-lg text-[var(--color-echo-gray)] md:text-xl">
              From concept to deployment, we build technology that drives
              measurable business outcomes.
            </p>
          </FadeIn>
        </Container>
      </Section>

      {/* Services Grid */}
      <Section spacing="xl">
        <Container>
          <Stagger className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <StaggerItem key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full"
                >
                  <div className="relative flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-void-gray)]/30 bg-[var(--color-deep-space)] p-8 transition-all duration-[var(--duration-normal)] hover:border-[var(--color-void-gray)] hover:bg-[var(--color-midnight)]">
                    {/* Icon */}
                    <div
                      className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-[var(--radius-lg)] transition-transform duration-[var(--duration-normal)] group-hover:scale-110"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${service.color} 20%, transparent)`,
                      }}
                    >
                      <service.icon
                        className="h-7 w-7"
                        style={{ color: service.color }}
                      />
                    </div>

                    {/* Content */}
                    <h3 className="mb-2 font-[var(--font-display)] text-xl font-semibold text-[var(--color-signal-white)]">
                      {service.title}
                    </h3>
                    <p
                      className="mb-4 text-sm font-medium"
                      style={{ color: service.color }}
                    >
                      {service.tagline}
                    </p>
                    <p className="mb-6 text-[var(--color-echo-gray)] leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="mb-6 flex-1 space-y-2">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-sm text-[var(--color-echo-gray)]"
                        >
                          <span
                            className="mr-3 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ backgroundColor: service.color }}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Learn More */}
                    <div className="flex items-center text-sm font-medium text-[var(--color-signal-white)]">
                      Learn more
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* CTA */}
      <Section spacing="xl">
        <Container>
          <FadeIn className="mx-auto max-w-3xl text-center">
            <Heading as="h2" size="lg" className="mb-6">
              Not sure which service you need?
            </Heading>
            <p className="mb-10 text-lg text-[var(--color-echo-gray)] leading-relaxed">
              Schedule a free consultation and we&apos;ll help you identify the right
              solution for your business goals.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">Start a Conversation</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/work">View Our Work</Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}
