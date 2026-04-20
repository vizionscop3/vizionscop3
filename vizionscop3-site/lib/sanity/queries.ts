import { groq } from "next-sanity";

// Project queries
export const projectsQuery = groq`
  *[_type == "project"] | order(publishedAt desc) {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    client,
    clientConfidential,
    industry,
    services,
    featured,
    heroImage,
    summary,
    technologies,
    publishedAt
  }
`;

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(publishedAt desc)[0...4] {
    _id,
    title,
    slug,
    client,
    clientConfidential,
    industry,
    services,
    heroImage,
    summary
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    client,
    clientConfidential,
    industry,
    services,
    featured,
    heroImage,
    gallery,
    summary,
    challenge,
    solution,
    results,
    metrics,
    testimonial,
    technologies,
    projectUrl,
    publishedAt
  }
`;

export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)][].slug.current
`;

// Article queries
export const articlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    _createdAt,
    title,
    slug,
    excerpt,
    heroImage,
    category,
    tags,
    "author": author->{name, slug, image},
    featured,
    publishedAt,
    readTime
  }
`;

export const featuredArticlesQuery = groq`
  *[_type == "article" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    heroImage,
    category,
    "author": author->{name, slug, image},
    publishedAt,
    readTime
  }
`;

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    excerpt,
    heroImage,
    body,
    category,
    tags,
    "author": author->{name, slug, image, bio, role},
    featured,
    publishedAt,
    readTime
  }
`;

export const articleSlugsQuery = groq`
  *[_type == "article" && defined(slug.current)][].slug.current
`;

export const articlesByCategoryQuery = groq`
  *[_type == "article" && category == $category] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    heroImage,
    category,
    "author": author->{name, slug, image},
    publishedAt,
    readTime
  }
`;

// Author queries
export const authorsQuery = groq`
  *[_type == "author"] | order(name asc) {
    _id,
    name,
    slug,
    image,
    bio,
    role
  }
`;

export const authorBySlugQuery = groq`
  *[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    image,
    bio,
    role,
    social
  }
`;

// Testimonial queries
export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    quote,
    author,
    role,
    company,
    image,
    featured
  }
`;

export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && featured == true] | order(_createdAt desc)[0...5] {
    _id,
    quote,
    author,
    role,
    company,
    image
  }
`;

// Category queries
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`;
