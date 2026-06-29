import { useEffect } from "react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function useScrollLock(locked) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!locked || prefersReducedMotion || typeof window === "undefined") return undefined;

    const previousOverflow = document.body.style.overflow;
    const previousOverscrollBehavior = document.body.style.overscrollBehavior;
    const preventScroll = (event) => event.preventDefault();

    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior = previousOverscrollBehavior;
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [locked, prefersReducedMotion]);
}
