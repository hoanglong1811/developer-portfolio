import { useState } from "react";

import { cn } from "@/lib/utils";

export default function TechLogoBadge({ technology, className }) {
  const [hasIconError, setHasIconError] = useState(false);
  const { name, icon: Icon, iconUrl, alt } = technology;
  const shouldShowUrlIcon = iconUrl && !hasIconError;

  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-2 border border-tech-border bg-tech-bg px-2.5 py-1.5 font-mono text-[11px] font-medium uppercase leading-none tracking-[0.06em] text-tech-text transition-colors hover:border-accent hover:text-foreground sm:text-xs",
        className,
      )}
    >
      {shouldShowUrlIcon && (
        <img
          src={iconUrl}
          alt={alt ?? name}
          className="size-5 shrink-0 object-contain"
          loading="lazy"
          onError={() => setHasIconError(true)}
        />
      )}
      {!shouldShowUrlIcon && Icon && <Icon className="size-5 shrink-0 text-accent" aria-hidden="true" />}
      <span>{name}</span>
    </span>
  );
}
