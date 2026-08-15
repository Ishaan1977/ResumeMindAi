import { Gauge, Code2, BrainCircuit } from "lucide-react";

export default function About() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <span className="font-mono text-xs uppercase tracking-widest text-amber">About</span>
      <h1 className="font-display text-3xl md:text-4xl font-semibold text-parchment mt-3 mb-6">
        Why an instrument panel for resumes?
      </h1>
      <p className="text-mist leading-relaxed mb-6">
        Most resume advice is vague — "make it stronger," "add more impact."
        ResuMind AI was built to replace that vagueness with a reading: a
        number, a reason, and a fix. The dial isn't decoration — it's the
        whole idea. A resume, like any signal, can be measured.
      </p>
      <p className="text-mist leading-relaxed mb-12">
        This project was built as a portfolio piece to demonstrate a full
        AI-integrated product: a React front end, a secure serverless proxy
        to Claude, and a design system built around one central metaphor
        instead of a generic dashboard template.
      </p>

      <div className="grid sm:grid-cols-3 gap-6">
        <div className="rounded-xl border border-white/5 bg-panel p-6">
          <Gauge className="h-5 w-5 text-amber mb-3" />
          <h3 className="font-display text-sm font-semibold text-parchment mb-1">
            Design
          </h3>
          <p className="text-sm text-mist leading-relaxed">
            An instrument-panel visual language — dials, ticks, mono
            readouts — built for this specific subject.
          </p>
        </div>
        <div className="rounded-xl border border-white/5 bg-panel p-6">
          <Code2 className="h-5 w-5 text-amber mb-3" />
          <h3 className="font-display text-sm font-semibold text-parchment mb-1">
            Stack
          </h3>
          <p className="text-sm text-mist leading-relaxed">
            React, React Router, Tailwind CSS, and a Vercel serverless
            function that proxies the AI call securely.
          </p>
        </div>
        <div className="rounded-xl border border-white/5 bg-panel p-6">
          <BrainCircuit className="h-5 w-5 text-amber mb-3" />
          <h3 className="font-display text-sm font-semibold text-parchment mb-1">
            AI
          </h3>
          <p className="text-sm text-mist leading-relaxed">
            Llama 3.3 (via Groq's free API) reads the resume with a
            structured prompt and returns a strict JSON scorecard the UI
            renders directly.
          </p>
        </div>
      </div>
    </section>
  );
}
