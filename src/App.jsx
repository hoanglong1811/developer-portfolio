import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import Footer from "@/components/layout/Footer";
import MainLayout from "@/components/layout/MainLayout";
import StartupTerminal from "@/components/shared/StartupTerminal";
import AboutSection from "@/components/portfolio/AboutSection";
import CertificatesSection from "@/components/portfolio/CertificatesSection";
import ContactSection from "@/components/portfolio/ContactSection";
import EducationSection from "@/components/portfolio/EducationSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import HeroSection from "@/components/portfolio/HeroSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import useLenis from "@/hooks/useLenis";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import useResetScrollPosition from "@/hooks/useResetScrollPosition";
import "@/styles/App.css";

function App() {
  useResetScrollPosition();
  useLenis();

  const prefersReducedMotion = usePrefersReducedMotion();

  // Startup is skipped immediately for reduced-motion users.
  // HeroSection will still run its own intro sequence after startup.
  const [startupComplete, setStartupComplete] = useState(prefersReducedMotion);

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Startup terminal — full-screen, unmounts via AnimatePresence        */}
      {/* ------------------------------------------------------------------ */}
      <AnimatePresence>
        {!startupComplete && (
          <StartupTerminal onComplete={() => setStartupComplete(true)} />
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------------ */}
      {/* Portfolio — invisible during startup, fades in after               */}
      {/* TableOfContents is rendered inside HeroSection after hero intro     */}
      {/* ------------------------------------------------------------------ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: startupComplete ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        aria-hidden={!startupComplete}
        style={{ pointerEvents: startupComplete ? undefined : "none" }}
      >
        <MainLayout>
          <HeroSection shouldStartAnimation={startupComplete} />
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <EducationSection />
          <CertificatesSection />
          <ContactSection />
          <Footer />
        </MainLayout>
      </motion.div>
    </>
  );
}

export default App;
