import { useEffect, useMemo, useState } from "react";

function getPrefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function normalizeLines(lines) {
  return lines.map((line) => String(line ?? "")).filter((line) => line.trim().length > 0);
}

/**
 * useTypewriterSequence
 *
 * Types a list of strings sequentially, character by character.
 *
 * Options:
 *   typeSpeed   — ms per character (default 35)
 *   lineDelay   — ms pause between lines (default 350)
 *   enabled     — when false, animation does not start; when it transitions
 *                 to true the full sequence runs from the beginning (default true)
 *
 * When `enabled` is false:
 *   - No timers are started
 *   - displayedLines is [] and isComplete is false
 *
 * When `enabled` becomes true (or was already true on mount):
 *   - Runs the full sequence once from line 0
 *   - Respects prefers-reduced-motion: shows all lines instantly if active
 */
export default function useTypewriterSequence(
  lines,
  { typeSpeed = 35, lineDelay = 350, enabled = true } = {},
) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getPrefersReducedMotion);
  const sequenceKey = JSON.stringify(lines);
  const normalizedLines = useMemo(() => normalizeLines(JSON.parse(sequenceKey)), [sequenceKey]);

  // Initial state: nothing displayed, not complete — animation hasn't started yet
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Listen for prefers-reduced-motion changes
  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Main animation effect — gated by `enabled`
  useEffect(() => {
    // Not enabled yet: sit idle with empty state
    if (!enabled) {
      setDisplayedLines([]);
      setCurrentLineIndex(0);
      setIsComplete(false);
      return undefined;
    }

    // Reduced motion or empty: show all lines immediately
    if (prefersReducedMotion || normalizedLines.length === 0) {
      setDisplayedLines(normalizedLines);
      setCurrentLineIndex(Math.max(normalizedLines.length - 1, 0));
      setIsComplete(true);
      return undefined;
    }

    // Full typewriter animation
    let timeoutId;
    let lineIndex = 0;
    let charIndex = 0;
    let isCancelled = false;

    setDisplayedLines([""]);
    setCurrentLineIndex(0);
    setIsComplete(false);

    const typeNextCharacter = () => {
      if (isCancelled) return;

      const currentLine = normalizedLines[lineIndex];

      if (charIndex <= currentLine.length) {
        setDisplayedLines([
          ...normalizedLines.slice(0, lineIndex),
          currentLine.slice(0, charIndex),
        ]);
        charIndex += 1;
        timeoutId = window.setTimeout(typeNextCharacter, typeSpeed);
        return;
      }

      lineIndex += 1;
      charIndex = 0;

      if (lineIndex >= normalizedLines.length) {
        setCurrentLineIndex(normalizedLines.length - 1);
        setIsComplete(true);
        return;
      }

      setCurrentLineIndex(lineIndex);
      setDisplayedLines([...normalizedLines.slice(0, lineIndex), ""]);
      timeoutId = window.setTimeout(typeNextCharacter, lineDelay);
    };

    timeoutId = window.setTimeout(typeNextCharacter, typeSpeed);

    return () => {
      isCancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [normalizedLines, prefersReducedMotion, typeSpeed, lineDelay, enabled]);

  return {
    displayedLines,
    currentLineIndex,
    isComplete,
    prefersReducedMotion,
  };
}
