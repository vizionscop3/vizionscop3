import { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/badge";
import { ArticleCard } from "@/components/cards/article-card";
import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { generatePageMetadata } from "@/lib/seo";
import { getArticles } from "@/lib/sanity/fetch";
import { isSanityConfigured } from "@/lib/sanity/is-configured";
import {
  articleHeroUrl,
  DEFAULT_ARTICLE_IMAGE,
} from "@/lib/sanity/article-helpers";

export const metadata: Metadata = generatePageMetadata({
  title: "Insights",
  description:
    "Technical articles, industry perspectives, and thought leadership from VizionScop3. Learn about web development, AI, and digital transformation.",
  path: "/insights",
});

// Placeholder articles until Sanity CMS is configured
const placeholderArticles = [
  {
    _id: "1",
    title: "The Real Cost of Technical Debt: A Framework for Decision Makers",
    slug: { current: "cost-of-technical-debt" },
    excerpt:
      "Technical debt isn't just a developer problem—it's a business liability. Learn how to quantify it and make informed decisions about when to pay it down.",
    heroImage: null,
    category: "Engineering",
    publishedAt: "2024-03-15",
    readTime: 8,
    author: { name: "Denward Lee Aulder", slug: { current: "vizion" } },
  },
  {
    _id: "2",
    title: "Building RAG Systems That Actually Work in Production",
    slug: { current: "rag-systems-production" },
    excerpt:
      "Retrieval-augmented generation looks simple in tutorials. Here's what it takes to build one that handles real-world complexity at scale.",
    heroImage: null,
    category: "AI",
    publishedAt: "2024-03-10",
    readTime: 12,
    author: { name: "Denward Lee Aulder", slug: { current: "vizion" } },
  },
  {
    _id: "3",
    title: "Why Nonprofits Deserve Enterprise-Grade Technology",
    slug: { current: "nonprofits-enterprise-tech" },
    excerpt:
      "Mission-driven organizations face unique technical challenges. Here's why they need—and can afford—solutions built for scale.",
    heroImage: null,
    category: "Industry",
    publishedAt: "2024-03-05",
    readTime: 6,
    author: { name: "Denward Lee Aulder", slug: { current: "vizion" } },
  },
  {
    _id: "4",
    title: "Next.js 15 Server Components: Performance Patterns That Matter",
    slug: { current: "nextjs-15-performance" },
    excerpt:
      "Server Components changed how we think about React applications. Here are the patterns that deliver measurable performance improvements.",
    heroImage: null,
    category: "Engineering",
    publishedAt: "2024-02-28",
    readTime: 10,
    author: { name: "Denward Lee Aulder", slug: { current: "vizion" } },
  },
  {
    _id: "5",
    title: "Database Migrations Without the Downtime",
    slug: { current: "database-migrations" },
    excerpt:
      "Zero-downtime migrations aren't just for big tech. Here's the playbook we use to evolve database schemas safely.",
    heroImage: null,
    category: "Engineering",
    publishedAt: "2024-02-20",
    readTime: 9,
    author: { name: "Denward Lee Aulder", slug: { current: "vizion" } },
  },
  {
    _id: "6",
    title: "The AI Integration Checklist for Enterprise Applications",
    slug: { current: "ai-integration-checklist" },
    excerpt:
      "Before you add AI to your application, make sure you've addressed these critical considerations for security, cost, and reliability.",
    heroImage: null,
    category: "AI",
    publishedAt: "2024-02-15",
    readTime: 7,
    author: { name: "Denward Lee Aulder", slug: { current: "vizion" } },
  },
];

const categories = ["All", "Engineering", "AI", "Industry", "Case Studies"];

export default async function InsightsPage() {
  let articles = placeholderArticles;
  if (isSanityConfigured()) {
    try {
      const remote = await getArticles();
      if (remote.length > 0) {
        articles = remote.map((a) => ({
          _id: a._id,
          title: a.title,
          slug: a.slug,
          excerpt: a.excerpt,
          heroImage: articleHeroUrl(a),
          category: a.category,
          publishedAt: a.publishedAt,
          readTime: a.readTime ?? 5,
          author: {
            name: a.author?.name ?? "VizionScop3",
            slug: a.author?.slug ?? { current: "vizion" },
          },
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
              Insights
            </span>
            <Heading as="h1" size="hero" className="mb-6">
              Ideas worth{" "}
              <span className="bg-gradient-to-r from-[var(--color-electric-cyan)] to-[var(--color-plasma-violet)] bg-clip-text text-transparent">
                building on
              </span>
            </Heading>
            <p className="text-lg text-[var(--color-echo-gray)] md:text-xl">
              Technical deep-dives, industry perspectives, and lessons learned
              from shipping real products.
            </p>
          </FadeIn>
        </Container>
      </Section>

      {/* Categories */}
      <Section spacing="sm">
        <Container>
          <FadeIn>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={category === "All" ? "primary" : "outline"}
                  className="cursor-pointer transition-colors hover:bg-[var(--color-midnight)]"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Articles Grid */}
      <Section spacing="lg">
        <Container>
          <Stagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <StaggerItem key={article._id}>
                <ArticleCard
                  title={article.title}
                  slug={article.slug.current}
                  excerpt={article.excerpt}
                  heroImage={
                    typeof article.heroImage === "string"
                      ? article.heroImage
                      : DEFAULT_ARTICLE_IMAGE
                  }
                  category={article.category}
                  publishedAt={article.publishedAt}
                  readTime={article.readTime}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Newsletter CTA */}
      <Section spacing="lg">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-2xl rounded-[var(--radius-xl)] border border-[var(--color-void-gray)]/50 bg-gradient-to-br from-[var(--color-deep-space)] to-[var(--color-midnight)] p-8 text-center md:p-12">
              <Heading as="h2" size="lg" className="mb-4">
                Stay updated
              </Heading>
              <p className="mb-6 text-[var(--color-echo-gray)]">
                Get notified when we publish new insights. No spam, unsubscribe
                anytime.
              </p>
              <form className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="rounded-[var(--radius-md)] border-2 border-[var(--color-void-gray)] bg-[var(--color-obsidian)] px-4 py-3 text-[var(--color-signal-white)] placeholder-[var(--color-echo-gray)] outline-none transition-colors focus:border-[var(--color-electric-cyan)]"
                />
                <button
                  type="submit"
                  className="rounded-[var(--radius-md)] bg-[var(--color-electric-cyan)] px-6 py-3 font-medium text-[var(--color-obsidian)] transition-all hover:bg-[var(--color-electric-cyan)]/90"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}
