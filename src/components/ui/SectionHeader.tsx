"use client";

import { cn } from "@/lib/utils";
import { ScrollReveal } from "./ScrollReveal";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "center" | "left";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  align = "center",
}: SectionHeaderProps) {
  return (
    <ScrollReveal
      className={cn(
        "mb-20 lg:mb-28",
        align === "center" && "text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="text-brand-orange text-xs lg:text-sm uppercase tracking-[0.25em] font-semibold mb-5">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-brand-text mb-6 tracking-[-0.03em] leading-[1.08]">
        {title}
      </h2>
      {description && (
        <p className="text-brand-muted text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </ScrollReveal>
  );
}
