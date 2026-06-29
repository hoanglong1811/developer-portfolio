import { BriefcaseBusiness, MapPin } from "lucide-react";

export default function TimelineItem({ company, location, position, duration, responsibilities = [] }) {
  return (
    <div className="relative sm:pl-12">
      <div className="absolute left-0 top-5 hidden size-8 items-center justify-center border border-border bg-background text-accent sm:flex">
        <BriefcaseBusiness className="size-4" aria-hidden="true" />
      </div>
      <article className="engineering-panel p-5 transition-colors hover:border-accent/70 sm:p-7">
        <div className="grid gap-4 border-b border-border pb-5 sm:grid-cols-2 sm:gap-x-6">
          <div>
            <p className="terminal-label mb-2">company</p>
            <h3 className="text-lg font-semibold uppercase leading-snug tracking-[0.08em] text-foreground md:text-xl">
              {company}
            </h3>
          </div>
          {location && (
            <div className="sm:text-right">
              <p className="terminal-label mb-2">location</p>
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase leading-6 tracking-[0.12em] text-muted-foreground md:text-base sm:justify-end">
                <MapPin className="size-4 text-accent" aria-hidden="true" />
                {location}
              </p>
            </div>
          )}
          <div>
            <p className="terminal-label mb-2">position</p>
            <p className="text-sm font-semibold uppercase leading-6 tracking-[0.14em] text-accent md:text-base">
              {position}
            </p>
          </div>
          <div className="sm:justify-self-end">
            <p className="terminal-label mb-2 sm:text-right">duration</p>
            <span className="tech-badge w-fit">{duration}</span>
          </div>
        </div>

        {responsibilities.length > 0 && (
          <ul className="mt-5 grid gap-3 text-sm leading-7 text-muted-foreground md:mt-6 md:text-base">
            {responsibilities.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 text-accent" aria-hidden="true">
                  &gt;
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </article>
    </div>
  );
}
