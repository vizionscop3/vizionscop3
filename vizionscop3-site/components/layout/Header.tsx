"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Logo } from "@/components/brand/Logo";
import { navigation } from "@/lib/constants";
import { cn } from "@/lib/utils";

const primaryCtaClass =
  "inline-flex min-h-11 items-center justify-center rounded-md border-2 border-black bg-[var(--color-electric-cyan)] px-5 py-2 text-sm font-semibold text-black shadow-[4px_4px_0_0_#000] transition-all duration-[var(--duration-fast)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric-cyan)]";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-void-gray)]/60 bg-[var(--color-obsidian)]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {navigation.primary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center text-sm font-medium text-[var(--color-echo-gray)] transition-colors hover:text-[var(--color-signal-white)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric-cyan)]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={cn(primaryCtaClass, "!min-h-11 !px-4 !py-2 !text-xs")}
          >
            Start a project
          </Link>
        </nav>
        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-[var(--color-void-gray)] text-[var(--color-signal-white)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric-cyan)] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </div>
      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-[var(--color-void-gray)]/60 bg-[var(--color-obsidian)] px-4 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-3">
            {navigation.primary.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block min-h-11 py-3 text-base font-medium leading-snug text-[var(--color-signal-white)]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className={cn(primaryCtaClass, "w-full justify-center")}
                onClick={() => setOpen(false)}
              >
                Start a project
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
