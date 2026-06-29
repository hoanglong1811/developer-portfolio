import { useEffect, useState } from "react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function useAsyncSectionData(data, delay = 420) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [state, setState] = useState(() => ({ loading: !prefersReducedMotion, data: prefersReducedMotion ? data : [] }));

  useEffect(() => {
    if (prefersReducedMotion) {
      setState({ loading: false, data });
      return undefined;
    }

    setState({ loading: true, data: [] });
    const timeoutId = window.setTimeout(() => setState({ loading: false, data }), delay);
    return () => window.clearTimeout(timeoutId);
  }, [data, delay, prefersReducedMotion]);

  return state;
}
