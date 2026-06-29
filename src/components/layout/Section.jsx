import Reveal from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

export default function Section({
  id,
  eyebrow,
  title,
  children,
  className,
  eyebrowClassName,
  headerClassName,
}) {
  return (
    <section
      id={id}
      className={cn(
        "mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20 lg:py-28",
        className,
      )}
    >
      <Reveal className={cn("mb-8 border-b border-border pb-5 sm:mb-10 sm:pb-6", headerClassName)}>
        {typeof eyebrow === "string" ? (
          <p className={cn("terminal-label mb-3", eyebrowClassName)}>{eyebrow}</p>
        ) : (
          eyebrow
        )}
        <h2 className="section-title text-3xl md:text-4xl lg:text-5xl">
          <span className="terminal-marker" aria-hidden="true">
            &gt;
          </span>
          {title}
        </h2>
      </Reveal>
      <Reveal>{children}</Reveal>
    </section>
  );
}
