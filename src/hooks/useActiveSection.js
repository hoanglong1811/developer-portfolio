import { useEffect, useRef, useState } from "react";

export default function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "home");
  const intersectingMapRef = useRef(new Map());

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) {
      return undefined;
    }

    intersectingMapRef.current.clear();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersectingMapRef.current.set(entry.target.id, entry);
          } else {
            intersectingMapRef.current.delete(entry.target.id);
          }
        });

        const activeEntries = Array.from(intersectingMapRef.current.values());

        if (activeEntries.length > 0) {
          activeEntries.sort((a, b) => {
            const heightA = a.intersectionRect.height;
            const heightB = b.intersectionRect.height;

            if (Math.abs(heightA - heightB) > 5) {
              return heightB - heightA;
            }

            return Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top);
          });

          const bestEntry = activeEntries[0];
          if (bestEntry) {
            setActiveSection(bestEntry.target.id);
          }
        }
      },
      {
        rootMargin: "-25% 0px -45% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0],
      },
    );

    sections.forEach((section) => observer.observe(section));

    const handleScroll = () => {
      if (window.scrollY < 50) {
        setActiveSection(sectionIds[0] ?? "home");
      } else if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60
      ) {
        setActiveSection(sectionIds[sectionIds.length - 1] ?? "contact");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionIds]);

  return activeSection;
}

