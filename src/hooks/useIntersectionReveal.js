import { useEffect, useRef, useState } from "react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function useIntersectionReveal({ rootMargin = "-80px", threshold = 0.15 } = {}) {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [hasEntered, setHasEntered] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      setHasEntered(true);
      return undefined;
    }

    const node = ref.current;
    if (!node || hasEntered) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasEntered, prefersReducedMotion, rootMargin, threshold]);

  return { ref, hasEntered, prefersReducedMotion };
}
