import * as React from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Linkedin, Github } from "@/components/ui/icons";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/brand/logo";
import { siteConfig, services, industries } from "@/lib/constants";

const footerLinks = {
  company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/about#careers" },
    { label: "Contact", href: "/contact" },
  ],
  services: services.slice(0, 4).map((s) => ({
    label: s.title,
    href: `/services/${s.slug}`,
  })),
  industries: industries.map((i) => ({
    label: i.title,
    href: `/industries/${i.slug}`,
  })),
  resources: [
    { label: "Insights", href: "/insights" },
    { label: "Case Studies", href: "/work" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Accessibility", href: "/accessibility" },
  ],
};

const socialLinks = [
  {
    label: "LinkedIn",
    href: siteConfig.links.linkedin,
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: siteConfig.links.github,
    icon: Github,
  },
  {
    label: "Email",
    href: `mailto:${siteConfig.links.email}`,
    icon: Mail,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-void-gray)]/50 bg-[var(--color-deep-space)]">
      <Container>
        <div className="py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-6 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Logo className="mb-6" />
              <p className="mb-6 max-w-sm text-sm text-[var(--color-echo-gray)]">
                AI-native technology solutions for organizations ready to lead.
                Based in {siteConfig.location.city}, {siteConfig.location.state}.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-void-gray)] text-[var(--color-echo-gray)] transition-all duration-[var(--duration-fast)] hover:border-[var(--color-electric-cyan)] hover:text-[var(--color-electric-cyan)]"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-4">
              <div>
                <h3 className="mb-4 text-sm font-semibold text-[var(--color-signal-white)]">
                  Company
                </h3>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--color-echo-gray)] transition-colors hover:text-[var(--color-signal-white)]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-semibold text-[var(--color-signal-white)]">
                  Services
                </h3>
                <ul className="space-y-3">
                  {footerLinks.services.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--color-echo-gray)] transition-colors hover:text-[var(--color-signal-white)]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-semibold text-[var(--color-signal-white)]">
                  Industries
                </h3>
                <ul className="space-y-3">
                  {footerLinks.industries.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--color-echo-gray)] transition-colors hover:text-[var(--color-signal-white)]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-semibold text-[var(--color-signal-white)]">
                  Resources
                </h3>
                <ul className="space-y-3">
                  {footerLinks.resources.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--color-echo-gray)] transition-colors hover:text-[var(--color-signal-white)]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[var(--color-void-gray)]/50 py-6 sm:flex-row">
          <p className="text-sm text-[var(--color-echo-gray)]">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--color-echo-gray)] transition-colors hover:text-[var(--color-signal-white)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
