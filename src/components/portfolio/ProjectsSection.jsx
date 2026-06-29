import ProjectCard from "@/components/cards/ProjectCard";
import Section from "@/components/layout/Section";
import Reveal from "@/components/shared/Reveal";
import SkeletonCard from "@/components/shared/SkeletonCard";
import { projects } from "@/constants/projects";
import useAsyncSectionData from "@/hooks/useAsyncSectionData";

function ProjectReveal({ project, index, featured = false, className = "" }) {
  return (
    <Reveal className={className} delay={(index % 3) * 0.05}>
      <ProjectCard project={project} featured={featured} />
    </Reveal>
  );
}

function ProjectGrid({ items, startIndex = 0, columns = "md:grid-cols-2 xl:grid-cols-3" }) {
  if (!items.length) return null;

  return (
    <div className={`grid gap-5 ${columns}`}>
      {items.map((project, index) => (
        <ProjectReveal key={project.title} project={project} index={startIndex + index} />
      ))}
    </div>
  );
}

function ProjectSkeletonLayout() {
  return <SkeletonCard lines={6} />;
}

function renderProjectsLayout(items) {
  const count = items.length;

  if (count === 1) return <ProjectReveal project={items[0]} index={0} featured />;
  if (count === 2) return <ProjectGrid items={items} columns="md:grid-cols-2" />;
  if (count === 4) return <ProjectGrid items={items} columns="md:grid-cols-2" />;

  if (count === 3) {
    return (
      <div className="grid gap-5">
        <ProjectReveal project={items[0]} index={0} featured />
        <ProjectGrid items={items.slice(1)} startIndex={1} columns="md:grid-cols-2" />
      </div>
    );
  }

  if (count === 5) {
    return (
      <div className="grid gap-5">
        <ProjectReveal project={items[0]} index={0} featured />
        <ProjectGrid items={items.slice(1)} startIndex={1} columns="md:grid-cols-2 xl:grid-cols-4" />
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      <ProjectReveal project={items[0]} index={0} featured />
      <ProjectReveal project={items[1]} index={1} featured />
      <div>
        <p className="terminal-label mb-4">other projects</p>
        <ProjectGrid items={items.slice(2)} startIndex={2} columns="md:grid-cols-2 xl:grid-cols-3" />
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const { loading, data } = useAsyncSectionData(projects);

  return (
    <Section id="projects" eyebrow="work index" title="Projects">
      {loading ? <ProjectSkeletonLayout /> : renderProjectsLayout(data)}
    </Section>
  );
}
