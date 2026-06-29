const simpleIcon = (slug) => `https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${slug}.svg`;
const devIcon = (slug, variant = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-${variant}.svg`;

export const capabilityGroups = [
  {
    title: "Programming & Frameworks",
    responsibilities: [
      "Building backend APIs with C#, ASP.NET Core, Python, and FastAPI.",
      "Creating interactive frontend interfaces with JavaScript, React, and Vue.",
      "Connecting full-stack features through clean service and API boundaries.",
    ],
    technologies: [
      { name: "C#", iconUrl: devIcon("csharp") },
      { name: "ASP.NET Core", iconUrl: devIcon("dotnetcore") },
      { name: "Python", iconUrl: devIcon("python") },
      { name: "FastAPI", iconUrl: devIcon("fastapi") },
      { name: "JavaScript", iconUrl: devIcon("javascript") },
      { name: "Node.js", iconUrl: devIcon("nodejs") },
      { name: "React", iconUrl: devIcon("react") },
      { name: "Vue", iconUrl: devIcon("vuejs") },
    ],
  },
  {
    title: "Databases & Tools",
    responsibilities: [
      "Modeling data for relational and document databases.",
      "Testing API behavior with structured Postman scenarios.",
      "Tracking implementation work and defects with Git and Jira.",
    ],
    technologies: [
      { name: "MongoDB", iconUrl: devIcon("mongodb") },
      { name: "PostgreSQL", iconUrl: devIcon("postgresql") },
      { name: "Redis", iconUrl: devIcon("redis") },
      { name: "Git", iconUrl: devIcon("git") },
      { name: "Postman", iconUrl: devIcon("postman") },
      { name: "Jira", iconUrl: devIcon("jira") },
    ],
  },
  {
    title: "DevOps & Systems",
    responsibilities: [
      "Working with Linux-based development and deployment environments.",
      "Using Docker for repeatable local and service workflows.",
      "Maintaining cPanel shared-hosting deployments with release checklists and log analysis.",
    ],
    technologies: [
      { name: "Linux", iconUrl: devIcon("linux") },
      { name: "Docker", iconUrl: devIcon("docker") },
      { name: "cPanel", iconUrl: simpleIcon("cpanel") },
    ],
  },
];
