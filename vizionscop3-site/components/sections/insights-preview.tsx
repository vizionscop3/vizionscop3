"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { ArticleCard } from "@/components/cards/article-card";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { FadeIn } from "@/components/motion/fade-in";

const latestArticles = [
  {
    slug: "ai-native-development-methodology",
    title: "What Does AI-Native Development Actually Mean?",
    excerpt:
      "Exploring how AI integration from day one changes everything about how we build software.",
    heroImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop",
    category: "AI",
    publishedAt: "2026-04-15",
    readTime: 8,
  },
  {
    slug: "choosing-the-right-tech-stack",
    title: "Choosing the Right Tech Stack in 2026",
    excerpt:
      "A practical guide to technology decisions that scale with your business.",
    heroImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop",
    category: "Engineering",
    publishedAt: "2026-04-10",
    readTime: 12,
  },
  {
    slug: "nonprofit-digital-transformation",
    title: "Digital Transformation for Nonprofits on a Budget",
    excerpt:
      "How mission-driven organizations can modernize without breaking the bank.",
    heroImage: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=450&fit=crop",
    category: "Business",
    publishedAt: "2026-04-05",
    readTime: 6,
  },
];

export function InsightsPreview() {
  return (
    <Section className="bg-[var(--color-deep-space)]">
      <Container>
        <FadeIn className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-[var(--color-electric-cyan)]">
              Insights
            </span>
            <Heading as="h2" size="xl">
              Latest Thinking
            </Heading>
          </div>
          <Button variant="outline" asChild>
            <Link href="/insights">
              View All Articles
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </FadeIn>

        <Stagger className="grid gap-6 md:grid-cols-3">
          {latestArticles.map((article) => (
            <StaggerItem key={article.slug}>
              <ArticleCard {...article} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
