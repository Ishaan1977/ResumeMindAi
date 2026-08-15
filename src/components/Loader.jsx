export default function Loader({ label = "Analyzing" }) {
  return (
    <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-mist">
      <span className="flex gap-1">
        <span className="h-2 w-2 animate-bounce rounded-full bg-amber [animation-delay:-0.3s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-amber [animation-delay:-0.15s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-amber" />
      </span>
      {label}…
    </div>
  );
}
