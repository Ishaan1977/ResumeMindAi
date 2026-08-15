import { useState } from "react";
import { Mail, Github, Linkedin, Send } from "lucide-react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // Hook this up to a form backend (Formspree, Resend, etc.) or your own
    // /api/contact endpoint. Left as a stub for the portfolio project.
    setSent(true);
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <span className="font-mono text-xs uppercase tracking-widest text-amber">Contact</span>
      <h1 className="font-display text-3xl md:text-4xl font-semibold text-parchment mt-3 mb-6">
        Get in touch.
      </h1>
      <p className="text-mist leading-relaxed mb-10 max-w-lg">
        Questions about this project, feedback on the analyzer, or just want
        to talk shop about the build — reach out.
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="font-mono text-xs uppercase tracking-widest text-mist">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-panel p-3 text-sm text-parchment outline-none focus:border-cobalt"
            />
          </div>
          <div>
            <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-mist">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-panel p-3 text-sm text-parchment outline-none focus:border-cobalt"
            />
          </div>
          <div>
            <label htmlFor="message" className="font-mono text-xs uppercase tracking-widest text-mist">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-panel p-3 text-sm text-parchment outline-none focus:border-cobalt resize-y"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-cobalt px-6 py-3 font-mono text-xs uppercase tracking-widest text-parchment hover:bg-cobaltDim transition-colors"
          >
            Send message <Send className="h-4 w-4" />
          </button>
          {sent && (
            <p className="text-sm text-amber">Thanks — this is a demo form, wire it up to your backend of choice.</p>
          )}
        </form>

        <div className="flex flex-col gap-4">
          <a href="mailto:you@example.com" className="flex items-center gap-3 rounded-xl border border-white/5 bg-panel p-4 text-sm text-parchment hover:border-cobalt/40 transition-colors">
            <Mail className="h-5 w-5 text-amber" /> you@example.com
          </a>
          <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl border border-white/5 bg-panel p-4 text-sm text-parchment hover:border-cobalt/40 transition-colors">
            <Github className="h-5 w-5 text-amber" /> github.com/yourusername
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl border border-white/5 bg-panel p-4 text-sm text-parchment hover:border-cobalt/40 transition-colors">
            <Linkedin className="h-5 w-5 text-amber" /> linkedin.com/in/yourusername
          </a>
        </div>
      </div>
    </section>
  );
}
