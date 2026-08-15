import { Link } from "react-router-dom";
import { ArrowRight, Upload, ScanSearch, Sparkles } from "lucide-react";
import ScoreGauge from "../components/ScoreGauge.jsx";
import StepCard from "../components/StepCard.jsx";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden grid-backdrop border-b border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block font-mono text-xs uppercase tracking-widest text-amber mb-5">
              Diagnostic-grade resume feedback
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold leading-[1.1] text-parchment mb-6">
              Your resume,
              <br />
              read by an instrument
              <br />
              that doesn't miss.
            </h1>
            <p className="text-mist text-base md:text-lg leading-relaxed max-w-md mb-8">
              ResuMind AI runs your resume through the same kind of structured
              read a recruiter gives it in six seconds — then tells you
              exactly what's holding the score down.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/analyzer"
                className="inline-flex items-center gap-2 rounded-full bg-cobalt px-6 py-3 font-mono text-xs uppercase tracking-widest text-parchment hover:bg-cobaltDim transition-colors"
              >
                Run Diagnostic <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/features"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 font-mono text-xs uppercase tracking-widest text-parchment hover:border-amber/50 transition-colors"
              >
                See how it works
              </Link>
            </div>
          </div>

          <div className="flex justify-center md:justify-end animate-floatSlow">
            <div className="rounded-3xl border border-white/5 bg-panel p-10">
              <ScoreGauge score={82} label="Sample Score" size={240} />
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-14 max-w-xl">
          <span className="font-mono text-xs uppercase tracking-widest text-amber">
            The process
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-parchment mt-3">
            Three steps, one honest read.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          <StepCard
            number="01"
            title="Upload"
            description="Paste your resume text — no file uploads, no storage, nothing leaves the request."
          />
          <StepCard
            number="02"
            title="Analyze"
            description="Claude reads it the way a recruiter would: structure, impact, keywords, clarity."
          />
          <StepCard
            number="03"
            title="Improve"
            description="Get a score plus specific, line-level fixes you can act on immediately."
          />
        </div>
      </section>

      {/* CTA strip */}
      <section className="border-t border-white/5 bg-panel">
        <div className="mx-auto max-w-6xl px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber/10 text-amber">
              <Sparkles className="h-5 w-5" />
            </div>
            <p className="font-display text-lg text-parchment max-w-sm">
              Free diagnostic. Takes about 20 seconds.
            </p>
          </div>
          <Link
            to="/analyzer"
            className="inline-flex items-center gap-2 rounded-full bg-cobalt px-6 py-3 font-mono text-xs uppercase tracking-widest text-parchment hover:bg-cobaltDim transition-colors"
          >
            Try the analyzer <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
