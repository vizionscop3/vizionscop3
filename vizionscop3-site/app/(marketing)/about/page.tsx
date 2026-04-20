import { Metadata } from "next";
import Link from "next/link";
import {
  Zap,
  Target,
  Users,
  Award,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "About",
  description:
    "VizionScop3 is an AI-native technology solutions company founded by Denward Lee Aulder. We serve organizations from nonprofits to enterprises with innovative digital solutions.",
  path: "/about",
});

const values = [
  {
    icon: Zap,
    title: "AI-Native Thinking",
    description:
      "We don't just use AI tools—we architect with AI as a fundamental layer. Every solution considers how intelligence can enhance outcomes.",
  },
  {
    icon: Target,
    title: "Outcome Obsession",
    description:
      "We measure success by your results, not our deliverables. Every feature ships with clear metrics tied to your business goals.",
  },
  {
    icon: Users,
    title: "Partnership Model",
    description:
      "We're not a vendor; we're an extension of your team. Transparent communication, shared context, aligned incentives.",
  },
  {
    icon: Award,
    title: "Craft Excellence",
    description:
      "We sweat the details others skip. Performance, accessibility, security—these aren't afterthoughts, they're foundational.",
  },
];

const timeline = [
  {
    year: "2024",
    title: "VizionScop3 Founded",
    description:
      "Denward Lee Aulder (Vizion) launches VizionScop3 in Brooklyn, NY with a vision to democratize enterprise-grade technology.",
  },
  {
    year: "2024",
    title: "First Enterprise Client",
    description:
      "Secured first Fortune 500 engagement, proving the model scales from nonprofit to enterprise.",
  },
  {
    year: "Present",
    title: "Growing Impact",
    description:
      "Serving 50+ organizations across nonprofit, corporate, and enterprise sectors with AI-native solutions.",
  },
];

const stats = [
  { value: "50+", label: "Clients Served" },
  { value: "200+", label: "Projects Delivered" },
  { value: "99.9%", label: "Uptime Achieved" },
  { value: "24h", label: "Response Time" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section spacing="lg" className="pt-32">
        <Container>
          <FadeIn className="mx-auto max-w-4xl">
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-[var(--color-electric-cyan)]">
              About VizionScop3
            </span>
            <Heading as="h1" size="hero" className="mb-6">
              Technology solutions with{" "}
              <span className="bg-gradient-to-r from-[var(--color-electric-cyan)] to-[var(--color-plasma-violet)] bg-clip-text text-transparent">
                purpose
              </span>
            </Heading>
            <p className="text-lg text-[var(--color-echo-gray)] md:text-xl">
              We&apos;re an AI-native technology company built on the belief that
              every organization—regardless of size—deserves access to
              exceptional digital solutions.
            </p>
          </FadeIn>
        </Container>
      </Section>

      {/* Stats */}
      <Section spacing="sm">
        <Container>
          <FadeIn>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="text-center"
                >
                  <p className="font-[var(--font-mono)] text-4xl font-bold text-[var(--color-electric-cyan)] md:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-[var(--color-echo-gray)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Founder Section */}
      <Section spacing="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            <FadeIn className="lg:col-span-2">
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-void-gray)]/50 bg-[var(--color-deep-space)]">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-gradient-to-br from-[var(--color-electric-cyan)] to-[var(--color-plasma-violet)]" />
                      <p className="text-sm text-[var(--color-echo-gray)]">
                        [Founder Photo]
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1} className="lg:col-span-3">
              <h2 className="mb-2 font-[var(--font-display)] text-3xl font-bold text-[var(--color-signal-white)]">
                Denward Lee Aulder
              </h2>
              <p className="mb-6 text-lg font-medium text-[var(--color-electric-cyan)]">
                Founder & CEO (Vizion)
              </p>

              <div className="prose prose-invert max-w-none">
                <p className="text-[var(--color-echo-gray)]">
                  VizionScop3 was founded with a clear mission: bring
                  enterprise-grade technology capabilities to organizations of
                  all sizes. After years of watching startups struggle with
                  technical debt and nonprofits settle for subpar solutions,
                  I knew there had to be a better way.
                </p>
                <p className="text-[var(--color-echo-gray)]">
                  Our approach is different. We&apos;re AI-native from the ground
                  up—not as a buzzword, but as a fundamental architectural
                  principle. Every solution we build considers how artificial
                  intelligence can enhance outcomes, automate the mundane, and
                  amplify human creativity.
                </p>
                <p className="text-[var(--color-echo-gray)]">
                  Based in Brooklyn, NY, we serve clients worldwide with a
                  remote-first team structure. Whether you&apos;re a nonprofit
                  looking to maximize impact or an enterprise ready to
                  modernize, we&apos;re here to help you build something
                  extraordinary.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild>
                  <Link href="/contact">
                    Work with Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Connect on LinkedIn
                  </a>
                </Button>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section spacing="lg">
        <Container>
          <FadeIn className="mb-12 text-center">
            <Heading as="h2" size="lg" className="mb-4">
              Our Values
            </Heading>
            <p className="mx-auto max-w-2xl text-[var(--color-echo-gray)]">
              The principles that guide every decision, every line of code, and
              every client relationship.
            </p>
          </FadeIn>

          <Stagger className="grid gap-6 md:grid-cols-2">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="h-full rounded-[var(--radius-xl)] border border-[var(--color-void-gray)]/50 bg-[var(--color-deep-space)] p-8">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-electric-cyan)]/10">
                    <value.icon className="h-6 w-6 text-[var(--color-electric-cyan)]" />
                  </div>
                  <h3 className="mb-3 font-[var(--font-display)] text-xl font-semibold text-[var(--color-signal-white)]">
                    {value.title}
                  </h3>
                  <p className="text-[var(--color-echo-gray)]">
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Timeline */}
      <Section spacing="lg">
        <Container>
          <FadeIn className="mb-12 text-center">
            <Heading as="h2" size="lg" className="mb-4">
              Our Journey
            </Heading>
          </FadeIn>

          <FadeIn>
            <div className="relative mx-auto max-w-3xl">
              <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-[var(--color-electric-cyan)] to-[var(--color-plasma-violet)] md:left-1/2" />

              {timeline.map((item, idx) => (
                <div
                  key={idx}
                  className={`relative mb-8 flex ${
                    idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="absolute left-4 -ml-2 h-4 w-4 rounded-full bg-[var(--color-electric-cyan)] md:left-1/2" />
                  <div
                    className={`ml-12 w-full md:ml-0 md:w-1/2 ${
                      idx % 2 === 0 ? "md:pr-12" : "md:pl-12"
                    }`}
                  >
                    <div className="rounded-[var(--radius-lg)] border border-[var(--color-void-gray)]/50 bg-[var(--color-deep-space)] p-6">
                      <span className="mb-2 inline-block text-sm font-bold text-[var(--color-electric-cyan)]">
                        {item.year}
                      </span>
                      <h3 className="mb-2 font-[var(--font-display)] text-lg font-semibold text-[var(--color-signal-white)]">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[var(--color-echo-gray)]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* CTA */}
      <Section spacing="lg">
        <Container>
          <FadeIn className="mx-auto max-w-3xl text-center">
            <Heading as="h2" size="lg" className="mb-6">
              Let&apos;s build the future together
            </Heading>
            <p className="mb-8 text-lg text-[var(--color-echo-gray)]">
              Whether you&apos;re a nonprofit with a big vision or an enterprise
              ready to innovate, we&apos;re here to help.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">Start a Conversation</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/work">See Our Work</Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}
