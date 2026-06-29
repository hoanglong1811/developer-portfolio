import CertificateCard from "@/components/cards/CertificateCard";
import Section from "@/components/layout/Section";
import Reveal from "@/components/shared/Reveal";
import SkeletonCard from "@/components/shared/SkeletonCard";
import { certificates } from "@/constants/certificates";
import useAsyncSectionData from "@/hooks/useAsyncSectionData";

function groupByCategory(items) {
  return items.reduce((groups, certificate) => {
    const category = certificate.category || "General";
    return { ...groups, [category]: [...(groups[category] || []), certificate] };
  }, {});
}

export default function CertificatesSection() {
  const { loading, data } = useAsyncSectionData(certificates);

  if (!loading && !data.length) return null;

  const hasSingleCertificate = data.length === 1;
  const groupedCertificates = groupByCategory(data);

  return (
    <Section id="certificates" eyebrow="verified learning" title="Certificates">
      {loading ? (
        <div className="mx-auto max-w-3xl">
          <SkeletonCard lines={5} />
        </div>
      ) : hasSingleCertificate ? (
        <Reveal>
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-base">
              <span className="text-accent" aria-hidden="true">
                ●
              </span>
              <span>{data[0].year}</span>
              <span className="h-px flex-1 bg-border" aria-hidden="true" />
            </div>
            <CertificateCard certificate={data[0]} />
          </div>
        </Reveal>
      ) : (
        <div className="grid gap-8">
          {Object.entries(groupedCertificates).map(([category, items], groupIndex) => (
            <div key={category}>
              <p className="terminal-label mb-4">{category}</p>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {items.map((certificate, index) => (
                  <Reveal key={certificate.title} delay={(groupIndex + index) * 0.05}>
                    <CertificateCard certificate={certificate} />
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
