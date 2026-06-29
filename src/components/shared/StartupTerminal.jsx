import { motion } from "motion/react";

import useStartupTerminal from "@/hooks/useStartupTerminal";
import useScrollLock from "@/hooks/useScrollLock";

/**
 * StartupTerminal
 *
 * Full-screen terminal intro that plays once per page session.
 * Sequence:
 *   1. Types all terminal blocks
 *   2. isDone becomes true → this component begins its fade-out animation
 *   3. onAnimationComplete fires → onComplete() is called
 *   4. Parent unmounts this component via AnimatePresence
 *
 * This ensures `onComplete` (which triggers the portfolio reveal and
 * HeroSection animation) only fires after the fade is fully finished.
 *
 * Props:
 *   onComplete — called AFTER the fade-out animation has fully completed.
 */
export default function StartupTerminal({ onComplete }) {
  const { lines, showCursor, isDone } = useStartupTerminal();

  // Lock body scroll while startup is running (released when isDone)
  useScrollLock(!isDone);

  return (
    <motion.div
      key="startup"
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: isDone ? 0 : 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      onAnimationComplete={(definition) => {
        // Only fire after the fade-OUT completes (opacity → 0), not the initial render
        if (isDone && definition?.opacity === 0) {
          onComplete?.();
        }
      }}
    >
      {/* Subtle engineering grid backdrop */}
      <div className="engineering-grid absolute inset-0 opacity-40" aria-hidden="true" />

      {/* Terminal window */}
      <div className="relative z-10 w-full max-w-lg px-4 sm:px-0">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 rounded-t border border-b-0 border-border bg-secondary px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-red-500/70" aria-hidden="true" />
          <span className="size-2.5 rounded-full bg-yellow-400/70" aria-hidden="true" />
          <span className="size-2.5 rounded-full bg-green-500/70" aria-hidden="true" />
          <span className="ml-4 font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase">
            chuhoanglong — bash
          </span>
        </div>

        {/* Terminal body */}
        <div
          aria-label="Startup terminal"
          aria-live="polite"
          className="min-h-[280px] rounded-b border border-border bg-background/90 px-5 py-4 font-mono text-sm leading-6 tracking-wide sm:min-h-[320px]"
        >
          {lines.map((line, i) => (
            <div key={i} className={line.isCommand ? "text-muted-foreground" : "text-accent"}>
              {line.text}
              {/* Cursor on the last actively-typed line */}
              {showCursor && i === lines.length - 1 && (
                <span className="ml-px animate-pulse text-accent" aria-hidden="true">
                  |
                </span>
              )}
            </div>
          ))}

          {/* Show cursor before first character arrives */}
          {lines.length === 0 && showCursor && (
            <span className="animate-pulse text-accent" aria-hidden="true">
              |
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
