import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-[var(--radius-md)] border-2 border-[var(--color-void-gray)] bg-[var(--color-deep-space)] px-4 py-2 text-base text-[var(--color-signal-white)] placeholder:text-[var(--color-echo-gray)] transition-colors duration-[var(--duration-fast)]",
          "focus:border-[var(--color-electric-cyan)] focus:outline-none focus:ring-2 focus:ring-[var(--color-electric-cyan)]/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
