import { client, getClient } from "./client";
import {
  projectsQuery,
  featuredProjectsQuery,
  projectBySlugQuery,
  projectSlugsQuery,
  articlesQuery,
  featuredArticlesQuery,
  articleBySlugQuery,
  articleSlugsQuery,
  articlesByCategoryQuery,
  authorsQuery,
  authorBySlugQuery,
  testimonialsQuery,
  featuredTestimonialsQuery,
  categoriesQuery,
} from "./queries";
import type {
  SanityProject,
  SanityArticle,
  SanityAuthor,
  SanityTestimonial,
  SanityCategory,
} from "./types";

// Projects
export async function getProjects(preview = false): Promise<SanityProject[]> {
  return getClient(preview).fetch(projectsQuery);
}

export async function getFeaturedProjects(preview = false): Promise<SanityProject[]> {
  return getClient(preview).fetch(featuredProjectsQuery);
}

export async function getProjectBySlug(
  slug: string,
  preview = false
): Promise<SanityProject | null> {
  return getClient(preview).fetch(projectBySlugQuery, { slug });
}

export async function getProjectSlugs(): Promise<string[]> {
  return client.fetch(projectSlugsQuery);
}

// Articles
export async function getArticles(preview = false): Promise<SanityArticle[]> {
  return getClient(preview).fetch(articlesQuery);
}

export async function getFeaturedArticles(preview = false): Promise<SanityArticle[]> {
  return getClient(preview).fetch(featuredArticlesQuery);
}

export async function getArticleBySlug(
  slug: string,
  preview = false
): Promise<SanityArticle | null> {
  return getClient(preview).fetch(articleBySlugQuery, { slug });
}

export async function getArticleSlugs(): Promise<string[]> {
  return client.fetch(articleSlugsQuery);
}

export async function getArticlesByCategory(
  category: string,
  preview = false
): Promise<SanityArticle[]> {
  return getClient(preview).fetch(articlesByCategoryQuery, { category });
}

// Authors
export async function getAuthors(preview = false): Promise<SanityAuthor[]> {
  return getClient(preview).fetch(authorsQuery);
}

export async function getAuthorBySlug(
  slug: string,
  preview = false
): Promise<SanityAuthor | null> {
  return getClient(preview).fetch(authorBySlugQuery, { slug });
}

// Testimonials
export async function getTestimonials(preview = false): Promise<SanityTestimonial[]> {
  return getClient(preview).fetch(testimonialsQuery);
}

export async function getFeaturedTestimonials(preview = false): Promise<SanityTestimonial[]> {
  return getClient(preview).fetch(featuredTestimonialsQuery);
}

// Categories
export async function getCategories(preview = false): Promise<SanityCategory[]> {
  return getClient(preview).fetch(categoriesQuery);
}
