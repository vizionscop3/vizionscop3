import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectCard } from "@/components/cards/project-card";
import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { generatePageMetadata } from "@/lib/seo";
import { getProjects } from "@/lib/sanity/fetch";
import { isSanityConfigured } from "@/lib/sanity/is-configured";
import {
  DEFAULT_PROJECT_IMAGE,
  projectHeroUrl,
} from "@/lib/sanity/project-helpers";

export const metadata: Metadata = generatePageMetadata({
  title: "Our Work",
  description:
    "Explore our portfolio of web development, mobile apps, custom software, and AI infrastructure projects delivered for nonprofits to Fortune 500 enterprises.",
  path: "/work",
});

// Placeholder projects until Sanity CMS is configured
const placeholderProjects = [
  {
    _id: "1",
    title: "Enterprise E-Commerce Platform",
    slug: { current: "enterprise-ecommerce" },
    client: "Fortune 500 Retailer",
    clientConfidential: true,
    industry: "Retail",
    services: ["Web Development", "Custom Software"],
    heroImage: DEFAULT_PROJECT_IMAGE,
    summary:
      "Complete e-commerce platform rebuild with 340% improvement in mobile conversions and 2-second page load times.",
  },
  {
    _id: "2",
    title: "Nonprofit Donor Management",
    slug: { current: "nonprofit-donor-platform" },
    client: "National Education Foundation",
    clientConfidential: false,
    industry: "Nonprofit",
    services: ["Web Development", "Database Engineering"],
    heroImage: DEFAULT_PROJECT_IMAGE,
    summary:
      "Custom donor management platform that increased retention by 45% and reduced administrative overhead by 60%.",
  },
  {
    _id: "3",
    title: "Healthcare AI Assistant",
    slug: { current: "healthcare-ai-assistant" },
    client: "Regional Hospital Network",
    clientConfidential: true,
    industry: "Healthcare",
    services: ["AI Infrastructure", "Custom Software"],
    heroImage: DEFAULT_PROJECT_IMAGE,
    summary:
      "AI-powered clinical decision support system reducing diagnosis time by 40% while maintaining 99.9% accuracy.",
  },
  {
    _id: "4",
    title: "Mobile Banking Application",
    slug: { current: "mobile-banking-app" },
    client: "Community Credit Union",
    clientConfidential: false,
    industry: "Finance",
    services: ["Mobile Development", "Custom Software"],
    heroImage: DEFAULT_PROJECT_IMAGE,
    summary:
      "Cross-platform mobile banking app with biometric security, achieving 50,000+ downloads in the first quarter.",
  },
  {
    _id: "5",
    title: "Legal Document Analysis Platform",
    slug: { current: "legal-document-analysis" },
    client: "Top 50 Law Firm",
    clientConfidential: true,
    industry: "Legal",
    services: ["AI Infrastructure", "Web Development"],
    heroImage: DEFAULT_PROJECT_IMAGE,
    summary:
      "RAG-powered contract analysis system that reduced review time by 90% while improving accuracy.",
  },
  {
    _id: "6",
    title: "Manufacturing ERP Integration",
    slug: { current: "manufacturing-erp" },
    client: "Industrial Manufacturer",
    clientConfidential: false,
    industry: "Manufacturing",
    services: ["Custom Software", "Database Engineering"],
    heroImage: DEFAULT_PROJECT_IMAGE,
    summary:
      "Legacy system modernization connecting 12 disparate systems, eliminating 40% of manual data entry.",
  },
];

const industries = [
  "All",
  "Nonprofit",
  "Healthcare",
  "Finance",
  "Retail",
  "Legal",
  "Manufacturing",
];

const services = [
  "All",
  "Web Development",
  "Mobile Development",
  "Custom Software",
  "Database Engineering",
  "AI Infrastructure",
];

export default async function WorkPage() {
  let projects = placeholderProjects;
  if (isSanityConfigured()) {
    try {
      const remote = await getProjects();
      if (remote.length > 0) {
        projects = remote.map((p) => ({
          _id: p._id,
          title: p.title,
          slug: p.slug,
          client: p.client ?? "",
          clientConfidential: p.clientConfidential,
          industry: p.industry,
          services: p.services,
          heroImage: projectHeroUrl(p),
          summary: p.summary,
        }));
      }
    } catch {
      /* keep placeholder */
    }
  }

  return (
    <>
      {/* Hero */}
      <Section spacing="lg" className="pt-32">
        <Container>
          <FadeIn className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-[var(--color-electric-cyan)]">
              Our Work
            </span>
            <Heading as="h1" size="hero" className="mb-6">
              Proof is in the{" "}
              <span className="bg-gradient-to-r from-[var(--color-electric-cyan)] to-[var(--color-plasma-violet)] bg-clip-text text-transparent">
                portfolio
              </span>
            </Heading>
            <p className="text-lg text-[var(--color-echo-gray)] md:text-xl">
              From nonprofits to Fortune 500 enterprises, explore the projects
              that demonstrate our commitment to excellence.
            </p>
          </FadeIn>
        </Container>
      </Section>

      {/* Filters */}
      <Section spacing="sm">
        <Container>
          <FadeIn>
            <div className="flex flex-col gap-6">
              {/* Industry filter */}
              <div>
                <p className="mb-3 text-sm font-medium text-[var(--color-echo-gray)]">
                  Industry
                </p>
                <div className="flex flex-wrap gap-2">
                  {industries.map((industry) => (
                    <Badge
                      key={industry}
                      variant={industry === "All" ? "primary" : "outline"}
                      className="cursor-pointer transition-colors hover:bg-[var(--color-midnight)]"
                    >
                      {industry}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Service filter */}
              <div>
                <p className="mb-3 text-sm font-medium text-[var(--color-echo-gray)]">
                  Service
                </p>
                <div className="flex flex-wrap gap-2">
                  {services.map((service) => (
                    <Badge
                      key={service}
                      variant={service === "All" ? "primary" : "outline"}
                      className="cursor-pointer transition-colors hover:bg-[var(--color-midnight)]"
                    >
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Projects Grid */}
      <Section spacing="lg">
        <Container>
          <Stagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <StaggerItem key={project._id}>
                <ProjectCard
                  title={project.title}
                  slug={project.slug.current}
                  client={project.client || undefined}
                  isConfidential={project.clientConfidential}
                  industry={project.industry}
                  services={project.services}
                  heroImage={project.heroImage}
                  summary={project.summary}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* CTA */}
      <Section spacing="lg">
        <Container>
          <FadeIn className="mx-auto max-w-3xl text-center">
            <Heading as="h2" size="lg" className="mb-6">
              Ready to join this portfolio?
            </Heading>
            <p className="mb-8 text-lg text-[var(--color-echo-gray)]">
              Let&apos;s discuss your project and how we can help you achieve
              measurable results.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">Start a Project</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}
