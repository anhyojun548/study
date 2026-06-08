"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

// design-skills/design-saas.md §6 (버튼 계층)
const variantClass: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-white to-[#e7e7ef] text-[#0a0a0f] font-semibold border border-transparent hover:shadow-[0_10px_30px_rgba(255,255,255,0.18)]",
  secondary:
    "glass glass-hover text-white",
  ghost:
    "bg-transparent border border-transparent text-muted hover:text-white",
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { variant = "secondary", className = "", children, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] text-[13px] font-medium transition-all duration-200 hover:-translate-y-px active:translate-y-0 whitespace-nowrap ${variantClass[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
});
