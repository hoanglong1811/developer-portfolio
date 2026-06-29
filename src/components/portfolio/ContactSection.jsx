import ContactForm from "@/components/portfolio/ContactForm";
import Section from "@/components/layout/Section";
import GlassCard from "@/components/shared/GlassCard";
import ContactIcon from "@/components/shared/ContactIcon";
import Reveal from "@/components/shared/Reveal";
import { contactLinks } from "@/constants/profile";
import { IconMap } from "@/utils/iconMap";

const contactCardOrder = ["Email", "LinkedIn", "GitHub"];

function ContactCard({ link }) {
  const IconComponent = typeof link.icon === "string" ? IconMap[link.icon] : link.icon;
  const isEmail = link.label === "Email";

  const cardContent = (
    <GlassCard className="p-5 transition-colors group-hover:border-accent/70">
      <div className="flex items-center gap-4">
        <ContactIcon iconUrl={link.iconUrl} fallbackIcon={IconComponent} label={link.label} />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase leading-5 tracking-[0.25em] text-muted-foreground">
            {link.label}
          </p>
          <p className="mt-2 break-words text-sm leading-6 text-foreground md:text-base">
            {link.value}
          </p>
        </div>
      </div>
    </GlassCard>
  );

  if (isEmail) {
    return <div className="group block w-full">{cardContent}</div>;
  }

  return (
    <a
      href={link.href}
      className="group block w-full"
      target={link.href.startsWith("http") ? "_blank" : undefined}
      rel={link.href.startsWith("http") ? "noreferrer" : undefined}
    >
      {cardContent}
    </a>
  );
}

export default function ContactSection() {
  const orderedContactLinks = contactCardOrder
    .map((label) => contactLinks.find((link) => link.label === label))
    .filter(Boolean);

  return (
    <Section id="contact" eyebrow="network connect" title="Contact">
      <div className="grid gap-6 md:gap-8 lg:grid-cols-[380px_minmax(0,1fr)] lg:items-stretch lg:gap-10">
        <div className="flex flex-col gap-5 lg:relative lg:h-full lg:justify-between lg:gap-0">
          {orderedContactLinks.map((link, index) => {
            const isMiddleCard = index === 1;
            const revealClassName = isMiddleCard
              ? "w-full lg:absolute lg:left-0 lg:right-0 lg:top-1/2 lg:-translate-y-1/2"
              : "w-full";

            return (
              <Reveal key={link.label} className={revealClassName} delay={index * 0.06}>
                <ContactCard link={link} />
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.12} className="h-full">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
