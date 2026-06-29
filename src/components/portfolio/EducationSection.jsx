import educationImage from "@/assets/images/education.png";
import Section from "@/components/layout/Section";
import GlassCard from "@/components/shared/GlassCard";
import Reveal from "@/components/shared/Reveal";
import { education } from "@/constants/education";

export default function EducationSection() {
  return (
    <Section id="education" eyebrow="academic record" title="Education">
      <Reveal>
        <GlassCard className="mx-auto max-w-4xl p-5 sm:p-7">
          <div className="grid gap-7 md:grid-cols-[220px_minmax(0,1fr)] md:items-center">
            <div className="flex flex-col items-center p-5 text-center">
              <div className="flex size-24 items-center justify-center p-3">
                <img
                  src={educationImage}
                  alt={`${education.school} logo`}
                  className="h-full w-full object-contain"
                />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase leading-5 tracking-[0.18em] text-muted-foreground">
                {education.location}
              </p>
            </div>

            <div>
              <div className="mb-6 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-base">
                <span className="text-accent" aria-hidden="true">
                  ●
                </span>
                <span>{education.startYear}</span>
                <span className="h-px flex-1 bg-border" aria-hidden="true" />
                <span>{education.endYear}</span>
              </div>

              <h3 className="text-lg font-semibold uppercase leading-snug tracking-[0.08em] text-foreground md:text-xl">
                {education.university}
              </h3>
              <p className="technical-copy mt-3">{education.degree}</p>
              <p className="mt-3 text-sm font-semibold uppercase leading-6 tracking-[0.12em] text-accent md:text-base">
                Expected Graduation: {education.expectedGraduation}
              </p>

              <div className="mt-6 grid gap-5 border-l border-border pl-4">
                <div>
                  <p className="terminal-label mb-2">Major:</p>
                  <p className="text-sm font-semibold uppercase leading-6 tracking-[0.12em] text-foreground md:text-base">
                    {education.major}
                  </p>
                </div>

                <div>
                  <p className="terminal-label mb-2">Award:</p>
                  <p className="text-sm leading-6 text-muted-foreground md:text-base">
                    {education.award}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </Reveal>
    </Section>
  );
}
