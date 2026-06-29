import { cn } from "@/lib/utils";

export default function TocItem({ link, active }) {
  const sectionId = link.href.replace("#", "");

  const handleClick = (event) => {
    event.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <a
      href={link.href}
      onClick={handleClick}
      aria-current={active ? "location" : undefined}
      className={cn(
        "pointer-events-auto group flex origin-left items-center gap-2 py-1.5 font-mono text-xs font-medium uppercase tracking-wide text-muted-foreground transition-all duration-200 hover:translate-x-1 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:outline-none",
        active && "translate-x-1 scale-[1.04] text-accent hover:text-accent",
      )}
    >
      <span className="w-4 text-accent transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
        <span className="group-hover:hidden">{active ? "▋" : "○"}</span>
        <span className="hidden group-hover:inline">{active ? "▋" : "▶"}</span>
      </span>
      <span>{link.label}</span>
    </a>
  );
}
