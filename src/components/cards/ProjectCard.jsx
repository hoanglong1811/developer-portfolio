import { CodeXml, ExternalLink } from "lucide-react";

import ImagePlaceholder from "@/components/shared/ImagePlaceholder";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function ProjectPreview({ image, title, featured }) {
  const className = cn("aspect-[16/9] bg-background", featured ? "min-h-64" : "min-h-48");

  if (!image) {
    return <ImagePlaceholder label={`${title} preview`} className={className} />;
  }

  return <img src={image} alt={`${title} screenshot`} className={cn(className, "w-full object-cover")} loading="lazy" />;
}

function DetailList({ title, items = [] }) {
  if (!items.length) return null;

  return (
    <div className="mt-5">
      <p className="terminal-label mb-3">{title}</p>
      <ul className="grid gap-2 border-l border-border pl-4 text-sm leading-7 text-muted-foreground md:text-base">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-accent" aria-hidden="true">
              &gt;
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProjectCard({ project, featured = false }) {
  const {
    title,
    description,
    image,
    role,
    category,
    status,
    duration,
    features = [],
    problemsSolved = [],
    metrics = [],
    achievements = [],
    stack = [],
    githubUrl,
    liveUrl,
  } = project;

  return (
    <article className="engineering-panel flex h-full flex-col overflow-hidden transition-colors hover:border-accent/70">
      <div className="border-b border-border p-4">
        <ProjectPreview image={image} title={title} featured={featured} />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          {category && <Badge>{category}</Badge>}
          {status && <Badge>{status}</Badge>}
        </div>

        <div className="mt-4 grid gap-3 border-b border-border pb-4 text-xs uppercase leading-5 tracking-[0.14em] text-muted-foreground sm:grid-cols-2">
          {role && (
            <p>
              <span className="text-accent">role:</span> {role}
            </p>
          )}
          {duration && (
            <p className="sm:text-right">
              <span className="text-accent">duration:</span> {duration}
            </p>
          )}
        </div>

        <h3 className="mt-5 text-lg font-semibold uppercase leading-snug tracking-[0.08em] text-foreground md:text-xl">
          {title}
        </h3>
        <p className="technical-copy mt-4">{description}</p>

        <DetailList title="achievements" items={achievements} />
        {featured && <DetailList title="features" items={features} />}
        {featured && <DetailList title="problems solved" items={problemsSolved} />}
        <DetailList title="metrics" items={metrics} />

        {stack.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {stack.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        )}

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: "outline" }))}>
              <CodeXml className="size-4" aria-hidden="true" />
              GitHub
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noreferrer" className={cn(buttonVariants())}>
              <ExternalLink className="size-4" aria-hidden="true" />
              Live Demo
            </a>
          )}
          {!githubUrl && !liveUrl && (
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <CodeXml className="size-4 text-accent" aria-hidden="true" />
              Source available on request
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
