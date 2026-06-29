import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    let frameId;
    const updateVisibility = () => {
      setVisible(window.scrollY > window.innerHeight * 0.7);
      frameId = undefined;
    };
    const requestUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <motion.button
      type="button"
      aria-label="Back to hero"
      className="fixed bottom-5 right-5 z-50 flex size-10 items-center justify-center border border-border bg-secondary font-mono text-lg text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:outline-none"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8, pointerEvents: visible ? "auto" : "none" }}
      transition={{ duration: 0.25 }}
      onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}
    >
      ↑
    </motion.button>
  );
}
