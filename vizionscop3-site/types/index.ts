export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  description?: string;
  icon: string;
  technologies?: string[];
  features?: string[];
}

export interface Industry {
  slug: string;
  title: string;
  description: string;
  challenges?: string[];
  services?: string[];
}

export interface Project {
  slug: string;
  title: string;
  client?: string;
  isConfidential?: boolean;
  industry: string;
  services: string[];
  technologies: string[];
  heroImage: string;
  summary: string;
  challenge?: string;
  approach?: string;
  solution?: string;
  outcomes?: Outcome[];
  testimonial?: Testimonial;
  timeline?: string;
  teamSize?: number;
  featured?: boolean;
  publishedAt: string;
}

export interface Outcome {
  metric: string;
  value: string;
  description?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
  image?: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  heroImage: string;
  category: string;
  tags: string[];
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readTime: number;
  featured?: boolean;
}

export interface Author {
  name: string;
  role: string;
  image?: string;
  bio?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  organization?: string;
  organizationType: string;
  projectType: string[];
  budgetRange?: string;
  timeline?: string;
  description: string;
}

export interface MethodologyPhase {
  phase: string;
  description: string;
  icon: string;
}
