import Link from "next/link";

import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { navigation, siteConfig } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();
  const { legalName, contact } = siteConfig;
  const { address } = contact;

  return (
    <footer className="border-t border-[var(--color-void-gray)]/60 bg-[var(--color-deep-space)]">
      <Container className="py-12 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md space-y-4">
            <Logo />
            <p className="text-sm text-[var(--color-echo-gray)]">
              {siteConfig.description}
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-8">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-signal-white)]">
                Explore
              </p>
              <ul className="space-y-2 text-sm">
                {navigation.primary.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-11 items-center text-[var(--color-echo-gray)] transition-colors hover:text-[var(--color-electric-cyan)]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-signal-white)]">
                Legal
              </p>
              <ul className="space-y-2 text-sm">
                {navigation.footer.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-11 items-center text-[var(--color-echo-gray)] transition-colors hover:text-[var(--color-electric-cyan)]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-12 space-y-4 border-t border-[var(--color-void-gray)]/50 pt-8 text-xs leading-relaxed text-[var(--color-echo-gray)]">
          <p>
            <strong className="text-[var(--color-signal-white)]">{legalName}</strong>
            <br />
            {address.line1}, {address.city}, {address.state} {address.postalCode},{" "}
            {address.country}. Contact:{" "}
            <a
              className="font-medium text-[var(--color-signal-white)] underline decoration-[var(--color-electric-cyan)] decoration-2 underline-offset-2"
              href={`mailto:${contact.email}`}
            >
              {contact.email}
            </a>
            .
          </p>
          <p>
            &copy; {year} {legalName}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
