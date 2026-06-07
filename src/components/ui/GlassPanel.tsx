import { cn } from "@/lib/utils";

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
}

export function GlassPanel({
  children,
  className,
  as: Component = "div",
}: GlassPanelProps) {
  return (
    <Component className={cn("glass-panel rounded-2xl", className)}>
      {children}
    </Component>
  );
}
