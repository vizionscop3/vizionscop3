import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type CardProps = ComponentProps<"div"> & { elevated?: boolean };

export function Card({ elevated, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border-2 bg-[var(--color-midnight)] p-6 shadow-[4px_4px_0_0_#000]",
        elevated &&
          "border-[var(--color-electric-cyan)] shadow-[4px_4px_0_0_var(--color-electric-cyan)]",
        !elevated && "border-[var(--color-void-gray)]",
        className,
      )}
      {...props}
    />
  );
}
