import { Gauge, Target, FileSearch, ListChecks, ShieldCheck, Zap } from "lucide-react";
import FeatureCard from "../components/FeatureCard.jsx";

const features = [
  {
    icon: Gauge,
    title: "Instrument scoring",
    description:
      "A single 0–100 read on overall resume strength, calibrated the same way across every submission.",
  },
  {
    icon: Target,
    title: "Job-description matching",
    description:
      "Paste a target job posting and get a tailored read on how well your resume speaks to that specific role.",
  },
  {
    icon: FileSearch,
    title: "Line-level feedback",
    description:
      "Not just 'add more detail' — specific bullets flagged, with the exact rewrite that strengthens them.",
  },
  {
    icon: ListChecks,
    title: "Strength & gap breakdown",
    description:
      "Three clear strengths to keep leaning on, three concrete gaps to close before you hit submit.",
  },
  {
    icon: ShieldCheck,
    title: "Nothing stored",
    description:
      "Your resume text is sent for a single analysis and never persisted. No accounts, no tracking.",
  },
  {
    icon: Zap,
    title: "Seconds, not days",
    description:
      "Skip the multi-day turnaround of a human reviewer — get a structured read back in under a minute.",
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-14 max-w-xl">
        <span className="font-mono text-xs uppercase tracking-widest text-amber">
          What's under the hood
        </span>
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-parchment mt-3">
          Every reading, fully instrumented.
        </h1>
        <p className="text-mist mt-4 leading-relaxed">
          ResuMind AI isn't a generic "paste and pray" checker. Every feature
          below exists to turn a vague feeling — "something's off with my
          resume" — into a specific, fixable finding.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </div>
    </section>
  );
}
