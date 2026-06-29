import { cn } from "@/lib/utils";

export default function Field({ label, textarea = false, ...props }) {
  const id = `field-${props.name}`;
  const Control = textarea ? "textarea" : "input";

  return (
    <label htmlFor={id} className="grid gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-foreground sm:text-sm">
      <span>{label}</span>
      <Control
        id={id}
        className={cn(
          "w-full border border-border bg-secondary px-3 py-3 text-sm leading-6 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent/50 md:text-base",
          textarea && "min-h-36 resize-y",
        )}
        {...props}
      />
    </label>
  );
}
