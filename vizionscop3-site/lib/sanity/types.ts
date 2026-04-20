import type { PortableTextBlock } from "@portabletext/types";

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  caption?: string;
}

export interface SanitySlug {
  _type: "slug";
  current: string;
}

export interface SanityAuthor {
  _id: string;
  name: string;
  slug: SanitySlug;
  image?: SanityImage;
  bio?: string;
  role?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface SanityProject {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: SanitySlug;
  client?: string;
  clientConfidential: boolean;
  industry: string;
  services: string[];
  featured: boolean;
  heroImage: SanityImage;
  gallery?: SanityImage[];
  summary: string;
  challenge?: PortableTextBlock[];
  solution?: PortableTextBlock[];
  results?: PortableTextBlock[];
  metrics?: {
    label: string;
    value: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  technologies: string[];
  projectUrl?: string;
  publishedAt: string;
}

export interface SanityArticle {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: SanitySlug;
  excerpt: string;
  heroImage: SanityImage;
  body: PortableTextBlock[];
  category: string;
  tags: string[];
  author: SanityAuthor;
  featured: boolean;
  publishedAt: string;
  readTime?: number;
}

export interface SanityCategory {
  _id: string;
  title: string;
  slug: SanitySlug;
  description?: string;
}

export interface SanityTestimonial {
  _id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  image?: SanityImage;
  featured: boolean;
}
