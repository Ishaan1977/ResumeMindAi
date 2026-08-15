import { Gauge } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-panel">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-display text-sm text-parchment">
          <Gauge className="h-4 w-4 text-amber" />
          ResuMind AI
        </div>
        <p className="font-mono text-[11px] uppercase tracking-widest text-mist text-center">
          Built with React &amp; Claude · A portfolio project
        </p>
        <p className="font-mono text-[11px] text-mist">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
