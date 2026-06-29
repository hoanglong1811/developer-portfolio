import {motion} from "motion/react";

import Section from "@/components/layout/Section";
import TechLogoBadge from "@/components/shared/TechLogoBadge";
import {capabilityGroups} from "@/constants/skills";

const rowVariants = {
  hidden: {opacity: 0, y: 18},
  visible: {opacity: 1, y: 0},
};

export default function SkillsSection() {
  return (
    <Section id="skills" eyebrow="capability matrix" title="Engineering Expertise">
      <div className="engineering-panel overflow-hidden">
        <div className="engineering-grid border-b border-border bg-secondary px-5 py-4 text-xs uppercase leading-5 tracking-[0.25em] text-muted-foreground sm:px-7 sm:text-sm">
          engineering capability matrix
        </div>
        <div className="divide-y divide-border">
          {capabilityGroups.map((group, index) => (
            <CapabilityRow key={group.title} group={group} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function CapabilityRow({group, index}) {
  return (
    <motion.article
      variants={rowVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{once: true, margin: "-70px"}}
      transition={{
        duration: 0.45,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="grid gap-6 px-5 py-6 transition-colors hover:bg-secondary sm:px-7 sm:py-7 lg:grid-cols-[minmax(0,0.7fr)_minmax(220px,0.3fr)]">
      <div>
        <h3 className="flex items-center gap-3 text-base font-semibold uppercase leading-6 tracking-[0.14em] text-foreground md:text-lg">
          <span className="terminal-marker" aria-hidden="true">
            &gt;
          </span>
          {group.title}
        </h3>
        <ul className="mt-4 grid gap-3 text-sm leading-7 text-muted-foreground sm:mt-5 md:text-base">
          {group.responsibilities.map((responsibility) => (
            <li key={responsibility} className="flex gap-3">
              <span
                className="mt-3 size-1.5 shrink-0 bg-accent"
                aria-hidden="true"
              />
              <span>{responsibility}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex min-w-0 flex-wrap gap-2 lg:justify-end lg:pt-8">
        {group.technologies.map((technology) => (
          <TechLogoBadge key={technology.name} technology={technology} />
        ))}
      </div>
    </motion.article>
  );
}
