import { TerminalSquare } from "lucide-react";

import { cn } from "@/lib/utils";

export default function ImagePlaceholder({ label, className }) {
  return (
    <div className={cn("engineering-panel engineering-grid relative overflow-hidden bg-secondary p-4", className)}>
      <div className="absolute inset-x-0 top-0 h-px bg-accent/60" />
      <div className="relative flex size-full min-h-[inherit] items-center justify-center border border-dashed border-border-muted bg-background/70 text-center">
        <div className="px-4 sm:px-6">
          <div className="mx-auto mb-4 flex size-10 items-center justify-center border border-border bg-card text-accent sm:size-11">
            <TerminalSquare className="size-5" aria-hidden="true" />
          </div>
          <p className="terminal-label text-foreground">{label}</p>
        </div>
      </div>
    </div>
  );
}
