export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="group rounded-2xl border border-white/5 bg-panel p-6 transition-colors hover:border-cobalt/40">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-cobalt/10 text-cobalt transition-colors group-hover:bg-cobalt group-hover:text-parchment">
        <Icon className="h-5 w-5" strokeWidth={2} />
      </div>
      <h3 className="font-display text-base font-semibold text-parchment mb-2">{title}</h3>
      <p className="text-sm leading-relaxed text-mist">{description}</p>
    </div>
  );
}
