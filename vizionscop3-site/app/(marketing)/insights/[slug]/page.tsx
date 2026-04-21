import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/fade-in";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { formatDate } from "@/lib/utils";
import { generateArticleMetadata } from "@/lib/seo";
import { getArticleBySlug, getArticleSlugs } from "@/lib/sanity/fetch";
import { isSanityConfigured } from "@/lib/sanity/is-configured";
import type { SanityArticle } from "@/lib/sanity/types";
import { articleHeroUrl } from "@/lib/sanity/article-helpers";

// Placeholder articles until Sanity CMS is configured
const placeholderArticles: Record<string, {
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: number;
  author: { name: string; role: string };
  content: string;
}> = {
  "cost-of-technical-debt": {
    title: "The Real Cost of Technical Debt: A Framework for Decision Makers",
    excerpt:
      "Technical debt isn't just a developer problem—it's a business liability. Learn how to quantify it and make informed decisions about when to pay it down.",
    category: "Engineering",
    publishedAt: "2024-03-15",
    readTime: 8,
    author: { name: "Denward Lee Aulder", role: "Founder & CEO" },
    content: `
## What is Technical Debt, Really?

Technical debt is a metaphor that describes the implied cost of future rework caused by choosing an easy solution now instead of using a better approach that would take longer.

But here's what most people miss: technical debt isn't inherently bad. Like financial debt, it's a tool. The problem is when organizations don't understand how much they're borrowing or what the interest rate looks like.

## The Hidden Costs

### 1. Developer Velocity

Every hour spent navigating legacy code or working around known issues is an hour not spent on features that drive business value. In our experience, teams with significant technical debt operate at 30-50% reduced velocity.

### 2. Recruitment and Retention

Top engineers want to work with modern technology. A codebase riddled with technical debt becomes a recruiting liability and accelerates turnover among your best people.

### 3. Incident Frequency

Systems with accumulated technical debt experience more outages. Each incident costs not just engineering time but customer trust and potential revenue.

## A Framework for Decision Making

We recommend evaluating technical debt using three dimensions:

1. **Business Impact** - How does this debt affect revenue, customers, or operational efficiency?
2. **Interest Rate** - How quickly is this debt accumulating additional costs?
3. **Payoff Complexity** - How difficult and risky is it to address this debt?

Plot each piece of debt on these dimensions to prioritize what to address and when.

## When to Accept Debt

Not all debt needs immediate repayment. Strategic technical debt—consciously chosen to hit a market window or validate a hypothesis—can be valuable. The key is making it visible and planning for eventual payoff.

## Conclusion

Technical debt is a business decision, not just a technical one. By quantifying its impact and using a structured framework for evaluation, decision makers can make informed choices about when to pay it down and when to accept it strategically.
    `,
  },
  "rag-systems-production": {
    title: "Building RAG Systems That Actually Work in Production",
    excerpt:
      "Retrieval-augmented generation looks simple in tutorials. Here's what it takes to build one that handles real-world complexity at scale.",
    category: "AI",
    publishedAt: "2024-03-10",
    readTime: 12,
    author: { name: "Denward Lee Aulder", role: "Founder & CEO" },
    content: `
## The Tutorial Gap

Every RAG tutorial follows the same pattern: chunk documents, embed them, store in a vector database, retrieve relevant chunks, and pass to an LLM. It works great on a few dozen documents.

Then you try to scale to thousands of documents with complex relationships, and everything falls apart.

## Real-World Challenges

### 1. Chunking Strategy

The "optimal" chunk size depends entirely on your content type. Legal documents need different treatment than technical documentation. Product catalogs require different handling than support tickets.

We've found that hybrid chunking—using semantic boundaries when possible, with configurable overlap—works best for most enterprise use cases.

### 2. Retrieval Quality

Vector similarity isn't always semantic relevance. A query about "reducing customer churn" might not retrieve a document about "improving retention rates" even though they're conceptually related.

The solution: hybrid retrieval combining dense vectors with sparse (keyword) matching, plus a reranking step using a cross-encoder model.

### 3. Context Assembly

Retrieving the top K chunks isn't enough. You need to understand relationships between chunks, maintain document boundaries, and assemble context that helps the LLM reason effectively.

## Architecture Patterns That Scale

After building RAG systems for multiple enterprise clients, we've settled on these patterns:

1. **Document-aware chunking** with metadata preservation
2. **Multi-stage retrieval** with hybrid search and reranking
3. **Contextual compression** to maximize useful information in the context window
4. **Fallback strategies** for when retrieval confidence is low

## Monitoring and Iteration

The most overlooked aspect of production RAG: continuous improvement. Every query is an opportunity to learn. Track retrieval quality, user feedback, and answer accuracy to identify where your system needs improvement.

## Conclusion

Production RAG is an engineering challenge, not just an AI challenge. The difference between a demo and a system users trust comes down to careful attention to data quality, retrieval precision, and operational rigor.
    `,
  },
};

export async function generateStaticParams() {
  const local = Object.keys(placeholderArticles);
  if (!isSanityConfigured()) {
    return local.map((slug) => ({ slug }));
  }
  try {
    const remote = await getArticleSlugs();
    const merged = [...new Set([...local, ...remote])];
    return merged.map((slug) => ({ slug }));
  } catch {
    return local.map((slug) => ({ slug }));
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (isSanityConfigured()) {
    try {
      const remote = await getArticleBySlug(slug);
      if (remote) {
        return generateArticleMetadata({
          title: remote.title,
          description: remote.excerpt,
          path: `/insights/${slug}`,
          publishedTime: remote.publishedAt,
        });
      }
    } catch {
      /* fall through */
    }
  }
  const article = placeholderArticles[slug];
  if (!article) return {};
  return generateArticleMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/insights/${slug}`,
    publishedTime: article.publishedAt,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let sanityArticle: SanityArticle | null = null;
  if (isSanityConfigured()) {
    try {
      sanityArticle = await getArticleBySlug(slug);
    } catch {
      sanityArticle = null;
    }
  }
  const article = placeholderArticles[slug];

  if (!sanityArticle && !article) notFound();

  const title = sanityArticle?.title ?? article!.title;
  const category = sanityArticle?.category ?? article!.category;
  const publishedAt = sanityArticle?.publishedAt ?? article!.publishedAt;
  const readTime = sanityArticle?.readTime ?? article!.readTime;
  const authorName =
    sanityArticle?.author?.name ?? article!.author.name;
  const authorRole =
    sanityArticle?.author?.role ?? article!.author.role;

  return (
    <>
      {/* Hero */}
      <Section spacing="lg" className="pt-32">
        <Container>
          <FadeIn className="mx-auto max-w-3xl">
            <Link
              href="/insights"
              className="mb-6 inline-flex items-center text-sm text-[var(--color-echo-gray)] transition-colors hover:text-[var(--color-electric-cyan)]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Insights
            </Link>

            <Badge variant="primary" className="mb-4">
              {category}
            </Badge>

            <Heading as="h1" size="xl" className="mb-6">
              {title}
            </Heading>

            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-echo-gray)]">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[var(--color-electric-cyan)] to-[var(--color-plasma-violet)]" />
                <div>
                  <p className="font-medium text-[var(--color-signal-white)]">
                    {authorName}
                  </p>
                  <p className="text-xs">{authorRole}</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(publishedAt)}
              </div>

              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {readTime} min read
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Hero Image Placeholder */}
      <Section spacing="sm">
        <Container>
          <FadeIn className="mx-auto max-w-4xl">
            <div className="relative aspect-video overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-void-gray)]/50 bg-[var(--color-deep-space)]">
              {sanityArticle?.heroImage?.asset ? (
                <Image
                  src={articleHeroUrl(sanityArticle)}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 896px) 100vw, 896px"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-[var(--color-echo-gray)]">
                    [Article Hero Image]
                  </p>
                </div>
              )}
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Content */}
      <Section spacing="lg">
        <Container>
          <FadeIn className="mx-auto max-w-3xl">
            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-[var(--font-display)] prose-headings:text-[var(--color-signal-white)] prose-p:text-[var(--color-echo-gray)] prose-strong:text-[var(--color-signal-white)] prose-a:text-[var(--color-electric-cyan)] prose-code:text-[var(--color-electric-cyan)]">
              {sanityArticle ? (
                <PortableText value={sanityArticle.body} />
              ) : (
                article!.content.split("\n").map((paragraph, idx) => {
                  if (paragraph.startsWith("## ")) {
                    return (
                      <h2 key={idx} className="mt-12 mb-4">
                        {paragraph.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith("### ")) {
                    return (
                      <h3 key={idx} className="mt-8 mb-3">
                        {paragraph.replace("### ", "")}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith("1. ") || paragraph.startsWith("- ")) {
                    return (
                      <p key={idx} className="my-2 pl-4">
                        {paragraph}
                      </p>
                    );
                  }
                  if (paragraph.trim()) {
                    return <p key={idx}>{paragraph}</p>;
                  }
                  return null;
                })
              )}
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Share & CTA */}
      <Section spacing="lg">
        <Container>
          <FadeIn className="mx-auto max-w-3xl">
            <div className="flex flex-col items-center justify-between gap-6 rounded-[var(--radius-xl)] border border-[var(--color-void-gray)]/50 bg-[var(--color-deep-space)] p-8 md:flex-row">
              <div>
                <p className="font-semibold text-[var(--color-signal-white)]">
                  Found this useful?
                </p>
                <p className="text-sm text-[var(--color-echo-gray)]">
                  Share it with your network
                </p>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button size="sm" asChild>
                  <Link href="/contact">Let&apos;s Talk</Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* More Articles */}
      <Section spacing="lg">
        <Container>
          <FadeIn className="mx-auto max-w-3xl text-center">
            <Heading as="h2" size="lg" className="mb-8">
              More Insights
            </Heading>
            <Button asChild variant="outline" size="lg">
              <Link href="/insights">View All Articles</Link>
            </Button>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}
