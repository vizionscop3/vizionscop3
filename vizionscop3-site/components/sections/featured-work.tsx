"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/cards/project-card";
import { FadeIn } from "@/components/motion/fade-in";

const featuredProjects = [
  {
    slug: "nonprofit-donor-platform",
    title: "Donor Management Platform",
    client: "Community Foundation",
    industry: "Nonprofits",
    services: ["Web Development", "Database Engineering"],
    heroImage: "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=500&fit=crop",
    summary: "Streamlined donation tracking and donor engagement, increasing recurring donations by 45%.",
  },
  {
    slug: "healthcare-scheduling-app",
    title: "Healthcare Scheduling System",
    isConfidential: true,
    industry: "Corporate",
    services: ["Mobile Applications", "AI Infrastructure"],
    heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=500&fit=crop",
    summary: "AI-powered appointment scheduling reducing no-shows by 60% and improving patient satisfaction.",
  },
  {
    slug: "ecommerce-platform",
    title: "E-Commerce Platform Rebuild",
    client: "RetailTech Inc",
    industry: "Small Business",
    services: ["Web Development", "Custom Software"],
    heroImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",
    summary: "Complete platform modernization achieving 3x faster load times and 85% conversion increase.",
  },
  {
    slug: "enterprise-data-pipeline",
    title: "Enterprise Data Pipeline",
    isConfidential: true,
    industry: "Enterprise",
    services: ["Database Engineering", "AI Infrastructure"],
    heroImage: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=500&fit=crop",
    summary: "Real-time data processing system handling 10M+ events daily with 99.99% uptime.",
  },
];

export function FeaturedWork() {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  return (
    <Section className="bg-[var(--color-deep-space)]">
      <Container>
        <FadeIn className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-[var(--color-electric-cyan)]">
              Our Work
            </span>
            <Heading as="h2" size="xl">
              Featured Projects
            </Heading>
          </div>
          <Button variant="outline" asChild>
            <Link href="/work">
              View All Work
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </FadeIn>
      </Container>

      <div className="relative">
        <div
          ref={scrollRef}
          className="scrollbar-hide flex gap-6 overflow-x-auto px-4 pb-4 md:px-8"
          style={{ scrollSnapType: "x mandatory" }}
        >
          <div className="shrink-0 md:w-[calc((100vw-80rem)/2)]" />
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              className="w-[85vw] shrink-0 md:w-[400px]"
              style={{ scrollSnapAlign: "start" }}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.19, 1, 0.22, 1],
              }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
          <div className="shrink-0 w-4 md:w-[calc((100vw-80rem)/2)]" />
        </div>
      </div>
    </Section>
  );
}
