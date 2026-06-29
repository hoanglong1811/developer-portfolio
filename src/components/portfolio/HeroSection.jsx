import {useEffect, useMemo, useState} from "react";
import {motion} from "motion/react";
import {ArrowRight, Eye, Mail, MapPin} from "lucide-react";
import TableOfContents from "@/components/layout/TableOfContents";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";
import Reveal from "@/components/shared/Reveal";
import {Button, buttonVariants} from "@/components/ui/button";
import {profile} from "@/constants/profile";
import useScrollLock from "@/hooks/useScrollLock";
import useTypewriterSequence from "@/hooks/useTypewriterSequence";
import {cn} from "@/lib/utils";

const TYPE_SPEED = 35;
const LINE_DELAY = 350;
const CTA_DELAY = 250;

function TypewriterCursor() {
  return <span className="text-accent animate-pulse">|</span>;
}

export default function HeroSection({ shouldStartAnimation = true }) {
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [isImageAnimationComplete, setIsImageAnimationComplete] =
    useState(false);
  const [isCtaAnimationComplete, setIsCtaAnimationComplete] = useState(false);

  const profileLines = useMemo(
    () =>
      [
        {key: "name", value: profile.name},
        {key: "role", value: profile.role},
        {key: "summary", value: profile.summary},
        {key: "email", value: profile.email},
        {key: "location", value: profile.location},
      ].filter((line) => String(line.value ?? "").trim().length > 0),
    [],
  );

  const {displayedLines, currentLineIndex, isComplete, prefersReducedMotion} =
    useTypewriterSequence(
      profileLines.map((line) => line.value),
      {typeSpeed: TYPE_SPEED, lineDelay: LINE_DELAY, enabled: shouldStartAnimation},
    );

  const shouldShowImage = prefersReducedMotion || isImageVisible;
  const shouldShowCta = prefersReducedMotion || isImageAnimationComplete;
  const isHeroIntroComplete = prefersReducedMotion || isCtaAnimationComplete;

  // Only lock scroll once HeroSection's own animation is running.
  // While startup is active, StartupTerminal owns the scroll lock.
  useScrollLock(shouldStartAnimation && !isHeroIntroComplete);

  useEffect(() => {
    if (!isComplete || isImageVisible) return;
    setIsImageVisible(true);

    if (prefersReducedMotion) {
      setIsImageAnimationComplete(true);
      setIsCtaAnimationComplete(true);
    }
  }, [isComplete, isImageVisible, prefersReducedMotion]);

  const renderCursor = (index) =>
    index === currentLineIndex && !isComplete ? <TypewriterCursor /> : null;

  const renderTypewriterLine = (line, index) => {
    const displayedText = displayedLines[index] ?? "";

    if (line.key === "name") {
      return (
        <h1
          key={line.key}
          className="text-4xl font-semibold uppercase leading-tight tracking-[0.04em] text-foreground sm:text-5xl lg:text-5xl xl:text-6xl">
          <span className="terminal-marker" aria-hidden="true">
            &gt;
          </span>{" "}
          {displayedText}
          {renderCursor(index)}
        </h1>
      );
    }

    if (line.key === "role") {
      return (
        <p
          key={line.key}
          className="mt-4 text-base font-semibold uppercase leading-7 tracking-[0.14em] text-accent sm:mt-5 sm:text-lg lg:text-xl">
          {displayedText}
          {renderCursor(index)}
        </p>
      );
    }

    if (line.key === "summary") {
      return (
        <p key={line.key} className="technical-copy mt-6 max-w-2xl sm:mt-7">
          {displayedText}
          {renderCursor(index)}
        </p>
      );
    }

    if (line.key === "email") {
      return (
        <a
          key={line.key}
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 break-all transition-colors hover:text-accent">
          <Mail className="size-4 shrink-0 text-accent" aria-hidden="true" />
          <span>
            {displayedText}
            {renderCursor(index)}
          </span>
        </a>
      );
    }

    return (
      <span key={line.key} className="inline-flex items-center gap-2">
        <MapPin className="size-4 shrink-0 text-accent" aria-hidden="true" />
        <span>
          {displayedText}
          {renderCursor(index)}
        </span>
      </span>
    );
  };

  const imageMotionProps = prefersReducedMotion
    ? {}
    : {
        initial: {opacity: 0, x: 80},
        animate: {opacity: 1, x: 0},
        transition: {duration: 0.6, ease: "easeOut"},
        onAnimationComplete: () => setIsImageAnimationComplete(true),
      };

  const ctaMotionProps = prefersReducedMotion
    ? {}
    : {
        initial: {opacity: 0, y: 8},
        animate: {opacity: 1, y: 0},
        transition: {duration: 0.35, delay: CTA_DELAY / 1000},
        onAnimationComplete: () => setIsCtaAnimationComplete(true),
      };

  return (
    <section id="home" className="relative min-h-[calc(100vh-72px)]">
      {isHeroIntroComplete && <TableOfContents />}
      <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-6xl items-center gap-10 px-5 py-16 sm:gap-12 sm:px-8 sm:py-20 lg:grid-cols-[1fr_0.78fr]">
        <Reveal className="max-w-3xl">
          <div aria-live="polite">
            {displayedLines.map((_, index) => {
              const line = profileLines[index];
              return ["name", "role", "summary"].includes(line?.key)
                ? renderTypewriterLine(line, index)
                : null;
            })}
          </div>

          {displayedLines.some((_, index) =>
            ["email", "location"].includes(profileLines[index]?.key),
          ) && (
            <div className="mt-8 grid gap-3 text-xs uppercase leading-6 tracking-[0.14em] text-muted-foreground sm:mt-9 sm:text-sm">
              {displayedLines.map((_, index) => {
                const line = profileLines[index];
                return ["email", "location"].includes(line?.key)
                  ? renderTypewriterLine(line, index)
                  : null;
              })}
            </div>
          )}

          {shouldShowCta && (
            <motion.div
              className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row"
              {...ctaMotionProps}>
              <Button
                size="lg"
                onClick={() =>
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({behavior: "smooth"})
                }>
                View Projects
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <a
                href={profile.cvHref}
                download
                className={cn(
                  buttonVariants({variant: "outline", size: "lg"}),
                )}>
                See my resume
                <Eye className="size-4" aria-hidden="true" />
              </a>
            </motion.div>
          )}
        </Reveal>

        {shouldShowImage && (
          <motion.div {...imageMotionProps}>
            <ImagePlaceholder
              label="Hero Image Placeholder"
              className="aspect-[4/5] min-h-[320px] sm:min-h-[420px]"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
