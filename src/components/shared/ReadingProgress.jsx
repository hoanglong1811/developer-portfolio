import useScrollProgress from "@/hooks/useScrollProgress";

export default function ReadingProgress({ className = "" }) {
  const progress = useScrollProgress();

  return (
    <div className={className} aria-hidden="true">
      <div className="relative h-28 w-px bg-border">
        <div
          className="absolute bottom-0 left-0 w-px bg-accent transition-transform duration-150 ease-out"
          style={{ height: `${progress * 100}%`, transform: "translateZ(0)" }}
        />
      </div>
    </div>
  );
}
