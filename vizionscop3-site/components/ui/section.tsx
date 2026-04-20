import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "article";
  spacing?: "sm" | "md" | "lg" | "xl";
}

const spacingClasses = {
  sm: "py-8 md:py-12 lg:py-16",
  md: "py-12 md:py-16 lg:py-20",
  lg: "py-16 md:py-24 lg:py-32",
  xl: "py-20 md:py-32 lg:py-40",
};

function Section({
  className,
  as: Component = "section",
  spacing = "lg",
  children,
  ...props
}: SectionProps) {
  return (
    <Component className={cn(spacingClasses[spacing], className)} {...props}>
      {children}
    </Component>
  );
}

export { Section };
