import IconFrame from "@/components/shared/IconFrame";
import { IconMap } from "@/utils/iconMap";

export default function HighlightCard({ title, description, icon }) {
  const IconComponent = typeof icon === "string" ? IconMap[icon] : icon;

  return (
    <div className="border border-border bg-secondary p-4 transition-colors hover:border-accent/70">
      {IconComponent && <IconFrame icon={IconComponent} compact />}
      <h3 className="mt-4 text-sm font-semibold uppercase leading-5 tracking-[0.14em] text-foreground md:text-base">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">{description}</p>
    </div>
  );
}
