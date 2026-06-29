import {useEffect, useRef, useState} from "react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

// ---------------------------------------------------------------------------
// Terminal content — full sequence shown once on startup
// ---------------------------------------------------------------------------
export const startupBlocks = [
  {command: "$ whoami", output: ["chuhoanglong"]},
  {command: "$ pwd", output: ["~/portfolio"]},
  {
    command: "$ ls",
    output: [
      "home/",
      "about/",
      "skills/",
      "experience/",
      "projects/",
      "education/",
      "certificates/",
      "contact/",
    ],
  },
  {command: "$ uptime", output: ["Portfolio running..."]},
];

// ---------------------------------------------------------------------------
// Timing constants (ms)
// ---------------------------------------------------------------------------
const TYPE_SPEED = 32; // ms per character
const LINE_DELAY = 180; // ms between lines in a block
const BLOCK_DELAY = 380; // ms pause between blocks
// Hold after last line before starting the fade-out animation
const COMPLETE_HOLD = 700; // ms

// ---------------------------------------------------------------------------
// Hook: useStartupTerminal
// ---------------------------------------------------------------------------
/**
 * Drives the one-shot startup terminal animation.
 *
 * Returns:
 *   lines      — flat list of { text, isCommand } rendered top-to-bottom
 *   showCursor — whether the blinking cursor should be shown
 *   isDone     — true once all blocks have been typed and the hold has elapsed;
 *                this triggers the fade-out in StartupTerminal, which then
 *                calls onComplete after the animation finishes
 *
 * Note: onComplete is intentionally NOT called from this hook.
 * StartupTerminal fires it via motion's onAnimationComplete so that
 * the portfolio only reveals itself after the fade is visually complete.
 *
 * Reduced motion: isDone is set to true immediately (skip everything).
 */
export default function useStartupTerminal() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const [lines, setLines] = useState([]);
  const [showCursor, setShowCursor] = useState(true);
  const [isDone, setIsDone] = useState(false);

  const cancelRef = useRef(false);

  useEffect(() => {
    // Reduced-motion: complete immediately — StartupTerminal fades out instantly
    if (prefersReducedMotion) {
      setIsDone(true);
      return undefined;
    }

    cancelRef.current = false;
    let timeoutId;

    function schedule(fn, delay) {
      if (cancelRef.current) return;
      timeoutId = window.setTimeout(() => {
        if (cancelRef.current) return;
        fn();
      }, delay);
    }

    // -----------------------------------------------------------------------
    // Type a string character by character into a specific line slot
    // -----------------------------------------------------------------------
    function typeString(text, isCommand, lineIndex, onDone) {
      let charIdx = 0;

      // Initialise the slot
      setLines((prev) => {
        const next = [...prev];
        next[lineIndex] = {text: "", isCommand};
        return next;
      });

      function step() {
        if (cancelRef.current) return;
        if (charIdx <= text.length) {
          const partial = text.slice(0, charIdx);
          setLines((prev) => {
            const next = [...prev];
            next[lineIndex] = {text: partial, isCommand};
            return next;
          });
          charIdx++;
          schedule(step, TYPE_SPEED);
        } else {
          onDone();
        }
      }

      schedule(step, TYPE_SPEED);
    }

    // -----------------------------------------------------------------------
    // Run all blocks sequentially
    // -----------------------------------------------------------------------
    let globalLineIdx = 0;

    function revealOutputLines(outputLines, idx, onAllDone) {
      if (cancelRef.current) return;
      if (idx >= outputLines.length) {
        onAllDone();
        return;
      }

      const lineIdx = globalLineIdx;
      globalLineIdx++;

      schedule(() => {
        typeString(outputLines[idx], false, lineIdx, () => {
          schedule(
            () => revealOutputLines(outputLines, idx + 1, onAllDone),
            LINE_DELAY,
          );
        });
      }, LINE_DELAY);
    }

    function runBlock(blockIdx) {
      if (cancelRef.current) return;

      if (blockIdx >= startupBlocks.length) {
        // All blocks typed — hold briefly, then signal done
        setShowCursor(false);
        schedule(() => setIsDone(true), COMPLETE_HOLD);
        return;
      }

      const {command, output} = startupBlocks[blockIdx];
      const cmdLineIdx = globalLineIdx;
      globalLineIdx++;

      typeString(command, true, cmdLineIdx, () => {
        revealOutputLines(output, 0, () => {
          schedule(() => runBlock(blockIdx + 1), BLOCK_DELAY);
        });
      });
    }

    runBlock(0);

    return () => {
      cancelRef.current = true;
      window.clearTimeout(timeoutId);
    };
  }, [prefersReducedMotion]);

  return {lines, showCursor, isDone};
}
