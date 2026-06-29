import { useEffect, useRef, useState } from "react";
import { X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { navigationLinks } from "@/constants/navigation";
import useActiveSection from "@/hooks/useActiveSection";
import useScrollLock from "@/hooks/useScrollLock";
import { cn } from "@/lib/utils";

const sectionIds = navigationLinks.map((link) => link.href.replace("#", ""));

/**
 * MobileNav
 *
 * Hamburger button + full-screen overlay navigation for sm/md viewports.
 * Hidden on lg and above (desktop uses the fixed ToC).
 *
 * Accessibility:
 *   - aria-expanded on trigger
 *   - aria-controls linking button to menu
 *   - aria-current on active link
 *   - Escape closes
 *   - Click-outside closes
 *   - Body scroll locked while open
 */
export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);
  const menuRef = useRef(null);
  const triggerRef = useRef(null);

  // Lock body scroll while menu is open
  useScrollLock(isOpen);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return undefined;

    function onKeyDown(e) {
      if (e.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // Close on click-outside
  useEffect(() => {
    if (!isOpen) return undefined;

    function onPointerDown(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    // Use mousedown so it fires before any click handlers
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [isOpen]);

  function handleLinkClick(e, href) {
    e.preventDefault();
    setIsOpen(false);
    const id = href.replace("#", "");
    // Small timeout to let the menu close animation start first
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  }

  return (
    // Only visible on < lg screens
    <div className="flex items-center lg:hidden">
      {/* Hamburger / close trigger */}
      <button
        ref={triggerRef}
        type="button"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-menu"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex size-8 items-center justify-center border border-border bg-secondary text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:outline-none"
      >
        {isOpen ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
      </button>

      {/* Overlay menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-x-0 top-[var(--header-height,56px)] z-50 border-b border-border bg-background/98 backdrop-blur-sm"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Grid texture */}
            <div className="engineering-grid absolute inset-0 opacity-30" aria-hidden="true" />

            <nav aria-label="Mobile navigation" className="relative px-4 py-5 sm:px-6">
              <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Navigation
              </p>

              <ul className="grid gap-1">
                {navigationLinks.map((link) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        aria-current={isActive ? "true" : undefined}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className={cn(
                          "group flex items-center gap-3 rounded-sm px-3 py-2.5 font-mono text-sm font-medium uppercase tracking-wide transition-colors hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:outline-none",
                          isActive
                            ? "text-accent"
                            : "text-muted-foreground",
                        )}
                      >
                        {/* Marker — single source of truth */}
                        <span className="w-4 shrink-0 text-accent" aria-hidden="true">
                          {isActive ? (
                            "▋"
                          ) : (
                            <>
                              <span className="group-hover:hidden">○</span>
                              <span className="hidden group-hover:inline">▶</span>
                            </>
                          )}
                        </span>
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
