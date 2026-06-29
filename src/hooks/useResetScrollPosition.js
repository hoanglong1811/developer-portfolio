import { useLayoutEffect } from "react";

export default function useResetScrollPosition() {
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    return () => {
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);
}
