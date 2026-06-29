import { useState } from "react";

import { cn } from "@/lib/utils";

export default function ContactIcon({ iconUrl, fallbackIcon: FallbackIcon, label, className }) {
  const [hasIconError, setHasIconError] = useState(false);
  const shouldShowUrlIcon = iconUrl && !hasIconError;

  return (
    <span
      className={cn(
        "flex size-11 shrink-0 items-center justify-center border border-border bg-secondary text-accent transition-colors group-hover:border-accent/70",
        className,
      )}
    >
      {shouldShowUrlIcon && (
        <img
          src={iconUrl}
          alt={`${label} icon`}
          className="h-5 w-5 object-contain"
          loading="lazy"
          onError={() => setHasIconError(true)}
        />
      )}
      {!shouldShowUrlIcon && FallbackIcon && <FallbackIcon className="size-5" aria-hidden="true" />}
    </span>
  );
}
