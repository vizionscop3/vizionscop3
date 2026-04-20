import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink, CheckCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { generatePageMetadata } from "@/lib/seo";
// import { getProjectBySlug, getProjectSlugs } from "@/lib/sanity";

// Placeholder case studies until Sanity is configured
const placeholderCaseStudies: Record<string, {
  title: string;
  client: string;
  clientConfidential: boolean;
  industry: string;
  services: string[];
  summary: string;
  challenge: string;
  solution: string;
  results: string;
  metrics: { label: string; value: string }[];
  technologies: string[];
  testimonial?: { quote: string; author: string; role: string };
}> = {
  "enterprise-ecommerce": {
    title: "Enterprise E-Commerce Platform",
    client: "Fortune 500 Retailer",
    clientConfidential: true,
    industry: "Retail",
    services: ["Web Development", "Custom Software", "Database Engineering"],
    summary:
      "Complete e-commerce platform rebuild achieving 340% improvement in mobile conversions.",
    challenge:
      "The client's legacy e-commerce platform was built on outdated technology, resulting in 8+ second page load times on mobile and a conversion rate 70% below industry average. The system couldn't scale during peak shopping periods, leading to significant revenue loss during Black Friday and holiday seasons.",
    solution:
      "We architected a modern headless commerce solution using Next.js for the frontend with a custom Node.js microservices backend. Key implementations included edge caching with Vercel, real-time inventory management, personalized product recommendations powered by ML, and a progressive web app for offline browsing.",
    results:
      "The new platform launched with sub-2-second page loads and 99.99% uptime during the following Black Friday—the highest traffic day in company history. Mobile conversions increased 340%, average order value grew 28%, and the platform now handles 10x the previous traffic capacity.",
    metrics: [
      { label: "Mobile Conversions", value: "+340%" },
      { label: "Page Load Time", value: "< 2s" },
      { label: "Black Friday Uptime", value: "99.99%" },
      { label: "Traffic Capacity", value: "10x" },
    ],
    technologies: [
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Vercel",
      "Stripe",
    ],
    testimonial: {
      quote:
        "VizionScop3 didn't just rebuild our platform—they transformed our digital business. The results exceeded every projection we had.",
      author: "VP of Digital",
      role: "Fortune 500 Retailer",
    },
  },
  "nonprofit-donor-platform": {
    title: "Nonprofit Donor Management",
    client: "National Education Foundation",
    clientConfidential: false,
    industry: "Nonprofit",
    services: ["Web Development", "Database Engineering", "Custom Software"],
    summary:
      "Custom donor management platform that increased retention by 45% and reduced administrative overhead by 60%.",
    challenge:
      "The foundation relied on a patchwork of spreadsheets, outdated CRM software, and manual processes to manage 50,000+ donors. Staff spent 20+ hours weekly on data entry, donation acknowledgments were often delayed weeks, and there was no visibility into donor lifecycle or retention patterns.",
    solution:
      "We designed a unified donor management platform with automated cultivation workflows, real-time donation processing, and comprehensive analytics. The system integrates with major payment processors, generates instant tax receipts, and provides AI-powered recommendations for donor engagement timing.",
    results:
      "Donor retention improved 45% within the first year. Administrative time on donor management dropped 60%, freeing staff for mission-focused work. The foundation also saw a 35% increase in recurring giving, driven by the new seamless monthly donation feature.",
    metrics: [
      { label: "Donor Retention", value: "+45%" },
      { label: "Admin Time Saved", value: "60%" },
      { label: "Recurring Giving", value: "+35%" },
      { label: "Acknowledgment Time", value: "< 24hr" },
    ],
    technologies: [
      "React",
      "Node.js",
      "PostgreSQL",
      "Stripe",
      "SendGrid",
      "AWS",
    ],
    testimonial: {
      quote:
        "For the first time, we can see our donor relationships clearly and act on insights in real-time. This platform has been transformational.",
      author: "Executive Director",
      role: "National Education Foundation",
    },
  },
};

export async function generateStaticParams() {
  // TODO: Fetch from Sanity when configured
  // const slugs = await getProjectSlugs();
  // return slugs.map((slug) => ({ slug }));
  return Object.keys(placeholderCaseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = placeholderCaseStudies[slug];

  if (!project) return {};

  return generatePageMetadata({
    title: `${project.title} | Case Study`,
    description: project.summary,
    path: `/work/${slug}`,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // TODO: Fetch from Sanity when configured
  // const project = await getProjectBySlug(slug);
  const project = placeholderCaseStudies[slug];

  if (!project) notFound();

  return (
    <>
      {/* Hero */}
      <Section spacing="lg" className="pt-32">
        <Container>
          <FadeIn className="mx-auto max-w-4xl">
            <Link
              href="/work"
              className="mb-6 inline-flex items-center text-sm text-[var(--color-echo-gray)] transition-colors hover:text-[var(--color-electric-cyan)]"
            >
              ← Back to Portfolio
            </Link>

            <div className="mb-6 flex flex-wrap gap-2">
              <Badge variant="primary">{project.industry}</Badge>
              {project.services.map((service) => (
                <Badge key={service} variant="outline">
                  {service}
                </Badge>
              ))}
            </div>

            <Heading as="h1" size="hero" className="mb-6">
              {project.title}
            </Heading>

            <div className="mb-6">
              <p className="text-sm uppercase tracking-wider text-[var(--color-echo-gray)]">
                Client
              </p>
              <p className="text-xl font-medium text-[var(--color-signal-white)]">
                {project.clientConfidential
                  ? "Confidential"
                  : project.client}
              </p>
            </div>

            <p className="text-lg text-[var(--color-echo-gray)]">
              {project.summary}
            </p>
          </FadeIn>
        </Container>
      </Section>

      {/* Hero Image Placeholder */}
      <Section spacing="sm">
        <Container>
          <FadeIn>
            <div className="aspect-video overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-void-gray)]/50 bg-[var(--color-deep-space)]">
              <div className="flex h-full items-center justify-center">
                <p className="text-[var(--color-echo-gray)]">
                  [Project Screenshot]
                </p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Metrics */}
      <Section spacing="md">
        <Container>
          <FadeIn>
            <div className="grid gap-6 md:grid-cols-4">
              {project.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="rounded-[var(--radius-lg)] border border-[var(--color-void-gray)]/50 bg-[var(--color-deep-space)] p-6 text-center"
                >
                  <p className="font-[var(--font-mono)] text-3xl font-bold text-[var(--color-electric-cyan)] md:text-4xl">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm text-[var(--color-echo-gray)]">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Challenge / Solution / Results */}
      <Section spacing="lg">
        <Container>
          <div className="mx-auto max-w-3xl space-y-12">
            <FadeIn>
              <h2 className="mb-4 font-[var(--font-display)] text-2xl font-semibold text-[var(--color-signal-white)]">
                The Challenge
              </h2>
              <p className="text-[var(--color-echo-gray)] leading-relaxed">
                {project.challenge}
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="mb-4 font-[var(--font-display)] text-2xl font-semibold text-[var(--color-signal-white)]">
                Our Solution
              </h2>
              <p className="text-[var(--color-echo-gray)] leading-relaxed">
                {project.solution}
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h2 className="mb-4 font-[var(--font-display)] text-2xl font-semibold text-[var(--color-signal-white)]">
                The Results
              </h2>
              <p className="text-[var(--color-echo-gray)] leading-relaxed">
                {project.results}
              </p>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Technologies */}
      <Section spacing="md">
        <Container>
          <FadeIn className="mx-auto max-w-3xl">
            <h2 className="mb-6 font-[var(--font-display)] text-2xl font-semibold text-[var(--color-signal-white)]">
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, idx) => (
                <Badge key={idx} variant="outline" className="text-sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Testimonial */}
      {project.testimonial && (
        <Section spacing="lg">
          <Container>
            <FadeIn className="mx-auto max-w-3xl">
              <div className="rounded-[var(--radius-xl)] border border-[var(--color-void-gray)]/50 bg-gradient-to-br from-[var(--color-deep-space)] to-[var(--color-midnight)] p-8 md:p-12">
                <blockquote className="mb-6 text-xl font-medium leading-relaxed text-[var(--color-signal-white)] md:text-2xl">
                  &ldquo;{project.testimonial.quote}&rdquo;
                </blockquote>
                <div>
                  <p className="font-semibold text-[var(--color-signal-white)]">
                    {project.testimonial.author}
                  </p>
                  <p className="text-sm text-[var(--color-echo-gray)]">
                    {project.testimonial.role}
                  </p>
                </div>
              </div>
            </FadeIn>
          </Container>
        </Section>
      )}

      {/* CTA */}
      <Section spacing="lg">
        <Container>
          <FadeIn className="mx-auto max-w-3xl text-center">
            <Heading as="h2" size="lg" className="mb-6">
              Ready for similar results?
            </Heading>
            <p className="mb-8 text-lg text-[var(--color-echo-gray)]">
              Let&apos;s discuss how we can help your organization achieve
              measurable outcomes.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">
                  Start a Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/work">View More Work</Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}
