import TimelineItem from "@/components/cards/TimelineItem";
import Section from "@/components/layout/Section";
import Reveal from "@/components/shared/Reveal";
import SkeletonCard from "@/components/shared/SkeletonCard";
import { experiences } from "@/constants/experience";
import useAsyncSectionData from "@/hooks/useAsyncSectionData";

export default function ExperienceSection() {
  const { loading, data } = useAsyncSectionData(experiences);

  return (
    <Section id="experience" eyebrow="career log" title="Experience">
      <div className="relative mx-auto max-w-4xl">
        <div className="absolute left-4 top-2 hidden h-[calc(100%-1rem)] w-px bg-border sm:block" />
        <div className="space-y-5">
          {loading
            ? Array.from({ length: Math.max(experiences.length, 1) }).map((_, index) => (
                <SkeletonCard key={index} className="sm:ml-12" lines={5} />
              ))
            : data.map((experience, index) => (
                <Reveal key={experience.position} delay={index * 0.06}>
                  <TimelineItem {...experience} />
                </Reveal>
              ))}
        </div>
      </div>
    </Section>
  );
}
