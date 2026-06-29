import HighlightCard from "@/components/cards/HighlightCard";
import Section from "@/components/layout/Section";
import GlassCard from "@/components/shared/GlassCard";
import Reveal from "@/components/shared/Reveal";
import { aboutHighlights } from "@/constants/profile";

export default function AboutSection() {
  return (
    <Section id="about" eyebrow="profile readme" title="About">
      <Reveal>
        <GlassCard className="p-5 sm:p-7">
          <div className="max-w-5xl">
            <p className="terminal-label mb-3">About Me</p>
            <p className="technical-copy" style={{ textAlign: "justify" }}>
              I am passionate about software development, problem solving, and creating digital products
              that feel fast, reliable, and easy to use. I enjoy working across the full stack, shaping
              thoughtful user interfaces, designing practical backend systems, and turning ideas into
              polished products.
            </p>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {aboutHighlights.map((item) => (
              <HighlightCard key={item.title} {...item} />
            ))}
          </div>
        </GlassCard>
      </Reveal>
    </Section>
  );
}
