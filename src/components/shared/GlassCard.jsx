import { cn } from "@/lib/utils";

export default function GlassCard({ children, className }) {
  return <div className={cn("engineering-panel", className)}>{children}</div>;
}
