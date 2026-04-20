import * as React from "react";
import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel;
  size?: "hero" | "xl" | "lg" | "md" | "sm" | "xs";
}

const sizeClasses = {
  hero: "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]",
  xl: "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15]",
  lg: "text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-[1.2]",
  md: "text-xl md:text-2xl lg:text-3xl font-semibold leading-[1.25]",
  sm: "text-lg md:text-xl font-semibold leading-[1.3]",
  xs: "text-base md:text-lg font-medium leading-[1.4]",
};

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as: Component = "h2", size = "lg", children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "font-[var(--font-display)] text-[var(--color-signal-white)]",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Heading.displayName = "Heading";

export { Heading };
