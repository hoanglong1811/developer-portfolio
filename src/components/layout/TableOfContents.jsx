import { motion } from "motion/react";

import TocItem from "@/components/layout/TocItem";
import ReadingProgress from "@/components/shared/ReadingProgress";
import { navigationLinks } from "@/constants/navigation";
import useActiveSection from "@/hooks/useActiveSection";

const sectionIds = navigationLinks.map((link) => link.href.replace("#", ""));

export default function TableOfContents() {
  const activeSection = useActiveSection(sectionIds);

  return (
    <motion.nav
      aria-label="Table of Contents"
      className="pointer-events-none fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block xl:left-8"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        Contents
      </p>
      <div className="my-3 h-px w-24 bg-accent" aria-hidden="true" />
      <div className="flex items-start gap-4">
        <ReadingProgress className="mt-1" />
        <div className="grid gap-1">
          {navigationLinks.map((link) => (
            <TocItem key={link.href} link={link} active={activeSection === link.href.replace("#", "")} />
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
