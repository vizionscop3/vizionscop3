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
    heroImage: "https://images.unsplash.com/photo-1576091160399?w=800&h=500&fit=crop",
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
  return (
    <Section spacing="xl" className="bg-[var(--color-deep-space)]">
      <Container>
        <FadeIn className="mb-16 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:items-end md:text-left">
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              className="h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
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
        </div>
      </Container>
    </Section>
  );
}
