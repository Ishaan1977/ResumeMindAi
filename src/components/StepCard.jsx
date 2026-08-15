export default function StepCard({ number, title, description }) {
  return (
    <div className="relative pl-14">
      <span className="absolute left-0 top-0 font-mono text-3xl font-medium text-cobalt/40">
        {number}
      </span>
      <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-parchment mb-1">
        {title}
      </h4>
      <p className="text-sm leading-relaxed text-mist">{description}</p>
    </div>
  );
}
