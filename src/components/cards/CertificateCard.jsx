import { ExternalLink } from "lucide-react";

import GlassCard from "@/components/shared/GlassCard";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CertificateCard({ certificate }) {
  const { title, issuer, issued, logo, skills = [], credentialUrl, category } = certificate;

  return (
    <GlassCard className="flex h-full flex-col p-5 transition-colors hover:border-accent/70 sm:p-6">
      <div className="flex items-start gap-4">
        <div className="flex size-16 shrink-0 items-center justify-center border border-border bg-secondary p-3">
          {logo ? (
            <img src={logo} alt={`${issuer} logo`} className="h-full w-full object-contain" loading="lazy" />
          ) : (
            <span className="text-sm font-semibold text-accent" aria-hidden="true">
              &gt;
            </span>
          )}
        </div>
        <div className="min-w-0">
          {category && <p className="terminal-label mb-2">{category}</p>}
          <h3 className="text-lg font-semibold uppercase leading-snug tracking-[0.08em] text-foreground md:text-xl">
            {title}
          </h3>
          <p className="mt-2 text-sm font-semibold uppercase leading-6 tracking-[0.12em] text-accent">
            {issuer}
          </p>
        </div>
      </div>

      {issued && (
        <div className="mt-6 border-l border-border pl-4">
          <p className="terminal-label mb-2">Issued</p>
          <p className="text-sm leading-6 text-muted-foreground md:text-base">{issued}</p>
        </div>
      )}

      {skills.length > 0 && (
        <div className="mt-6">
          <p className="terminal-label mb-3">Skills</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
        </div>
      )}

      {credentialUrl && (
        <a href={credentialUrl} target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: "outline" }), "mt-6 w-fit")}>
          View Credential
          <ExternalLink className="size-4" aria-hidden="true" />
        </a>
      )}
    </GlassCard>
  );
}
