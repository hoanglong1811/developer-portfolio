export default function SkeletonCard({ lines = 4, className = "" }) {
  return (
    <div className={`engineering-panel overflow-hidden p-5 ${className}`} aria-hidden="true">
      <div className="skeleton-shimmer h-40 border border-border bg-secondary" />
      <div className="mt-5 grid gap-3">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className="skeleton-shimmer h-3 bg-secondary"
            style={{ width: `${index === 0 ? 82 : 58 + (index % 3) * 12}%` }}
          />
        ))}
      </div>
    </div>
  );
}
