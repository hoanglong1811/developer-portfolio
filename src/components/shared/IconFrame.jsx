import { cn } from "@/lib/utils";

export default function IconFrame({ icon: Icon, compact = false }) {
  return (
    <span
      className={cn(
        "flex items-center justify-center border border-border bg-secondary text-accent",
        compact ? "size-9" : "size-11",
      )}
    >
      <Icon className={compact ? "size-4" : "size-5"} aria-hidden="true" />
    </span>
  );
}
