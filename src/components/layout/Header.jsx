import { Mail } from "lucide-react";

import MobileNav from "@/components/layout/MobileNav";
import { profile } from "@/constants/profile";
import { cn } from "@/lib/utils";

/**
 * Header
 *
 * Compact sticky branding bar.
 * - Desktop (lg+): logo + name + optional contact button. ToC handles section nav.
 * - Mobile/tablet (<lg): logo + name + hamburger (MobileNav).
 *
 * The Linux terminal animation has been moved to StartupTerminal.
 */
export default function Header() {
  return (
    <header className="sticky inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="engineering-grid absolute inset-0 opacity-35" aria-hidden="true" />
      <div className="relative flex min-h-14 w-full items-center gap-3 px-3 py-2 min-[375px]:min-h-[60px] min-[375px]:px-4 md:min-h-16 md:px-6 lg:min-h-[68px] lg:px-8 xl:min-h-[72px] xl:px-12 2xl:px-16">
        {/* Brand — always visible */}
        <HeaderBrand />

        {/* Spacer pushes actions to the right */}
        <div className="flex-1" />

        {/* Desktop-only contact button */}
        <div className="hidden lg:flex lg:shrink-0 lg:items-center lg:justify-end">
          <ContactAction />
        </div>

        {/* Mobile/tablet hamburger — hidden on lg+ */}
        <MobileNav />
      </div>
    </header>
  );
}

function HeaderBrand() {
  return (
    <a
      href="#home"
      className="group flex min-w-0 shrink-0 items-center gap-2.5 border-l border-accent pl-2.5 transition-colors hover:border-accent-hover focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:outline-none min-[375px]:gap-3 min-[375px]:pl-3"
      aria-label={`${profile.name} home`}
    >
      <span className="flex size-8 shrink-0 items-center justify-center border border-border bg-secondary text-sm font-semibold text-accent transition-colors group-hover:border-accent min-[375px]:text-base md:size-9 md:text-lg">
        {profile.initials}
      </span>
      <span className="hidden min-w-0 min-[375px]:block">
        <span className="block truncate whitespace-nowrap text-xs font-semibold uppercase leading-4 tracking-[0.14em] text-foreground md:text-sm">
          {profile.name}
        </span>
        <span className="mt-0.5 hidden truncate whitespace-nowrap text-[10px] leading-4 text-muted-foreground sm:block 2xl:text-xs">
          {profile.role}
        </span>
      </span>
    </a>
  );
}

function ContactAction({ className }) {
  return (
    <a
      href="#contact"
      aria-label="Contact"
      className={cn(
        "inline-flex h-8 items-center justify-center gap-2 border border-border bg-secondary px-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:outline-none sm:px-3",
        className,
      )}
    >
      <Mail className="size-3.5" aria-hidden="true" />
      <span className="hidden sm:inline">Contact</span>
    </a>
  );
}
