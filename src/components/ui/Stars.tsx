/** Five-point star rendered from a geometric polygon. */
export function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M12 1.8l3.06 6.5 7.14.86-5.26 4.93 1.36 7.07L12 17.7l-6.3 3.46 1.36-7.07L1.8 9.16l7.14-.86z"
      />
    </svg>
  );
}

export function StarRow({ count = 5, className = "", starClassName = "size-4" }: { count?: number; className?: string; starClassName?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} className={starClassName} />
      ))}
    </span>
  );
}
