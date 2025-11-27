export default function AtomicLoader() {
  return (
    <div className="relative w-20 h-20">
      {/* Nucleus */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full atomic-glow" />

      {/* Orbit 1 */}
      <div className="absolute inset-0 rounded-full border border-primary/40 orbit-1">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full" />
      </div>

      {/* Orbit 2 */}
      <div className="absolute inset-0 rounded-full border border-primary/30 orbit-2" style={{ transform: "rotate(45deg)" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary/80 rounded-full" />
      </div>

      {/* Orbit 3 */}
      <div className="absolute inset-0 rounded-full border border-primary/20 orbit-3" style={{ transform: "rotate(90deg)" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary/60 rounded-full" />
      </div>
    </div>
  );
}
