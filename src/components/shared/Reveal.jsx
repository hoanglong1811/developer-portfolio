import { motion } from "motion/react";
import useIntersectionReveal from "@/hooks/useIntersectionReveal";

export default function Reveal({ children, className, delay = 0, yOffset = 18 }) {
  const { ref, hasEntered, prefersReducedMotion } = useIntersectionReveal();
  const visible = prefersReducedMotion || hasEntered;

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : yOffset }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.35, delay: visible ? delay : 0, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
