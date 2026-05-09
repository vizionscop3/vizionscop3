"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-[var(--duration-normal)] ease-[var(--ease-out-expo)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-electric-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-obsidian)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

const variantClass = {
  primary:
    "bg-[var(--color-electric-cyan)] text-[var(--color-obsidian)] hover:bg-[var(--color-electric-cyan)]/90 hover:shadow-[var(--shadow-glow-cyan)]",
  secondary:
    "bg-[var(--color-plasma-violet)] text-[var(--color-signal-white)] hover:bg-[var(--color-plasma-violet)]/90 hover:shadow-[var(--shadow-glow-violet)]",
  outline:
    "border-2 border-[var(--color-void-gray)] bg-transparent text-[var(--color-signal-white)] hover:border-[var(--color-electric-cyan)] hover:text-[var(--color-electric-cyan)]",
  ghost:
    "bg-transparent text-[var(--color-echo-gray)] hover:bg-[var(--color-deep-space)] hover:text-[var(--color-signal-white)]",
  link: "text-[var(--color-electric-cyan)] underline-offset-4 hover:underline",
} as const;

const sizeClass = {
  sm: "h-10 rounded-[var(--radius-sm)] px-5 text-sm",
  md: "h-12 rounded-[var(--radius-md)] px-8 text-sm",
  lg: "h-14 rounded-[var(--radius-md)] px-10 text-base",
  icon: "h-10 w-10 rounded-[var(--radius-md)]",
} as const;

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variantClass;
  size?: keyof typeof sizeClass;
  asChild?: boolean;
};

export function buttonVariants(opts: {
  variant?: keyof typeof variantClass;
  size?: keyof typeof sizeClass;
  className?: string;
}) {
  const v = opts.variant ?? "primary";
  const s = opts.size ?? "md";
  return cn(base, variantClass[v], sizeClass[s], opts.className);
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    const classes = buttonVariants({ variant, size, className });

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        className: cn(classes, child.props.className),
      });
    }

    return (
      <button ref={ref} type={type} className={classes} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
