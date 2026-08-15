import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Gauge, Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/features", label: "Features" },
  { to: "/analyzer", label: "Analyzer" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-ink/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="flex items-center gap-2 font-display font-semibold text-lg text-parchment">
          <Gauge className="h-5 w-5 text-amber" strokeWidth={2.2} />
          ResuMind<span className="text-cobalt">AI</span>
        </NavLink>

        <ul className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `transition-colors hover:text-amber ${
                    isActive ? "text-amber" : "text-mist"
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <NavLink
          to="/analyzer"
          className="hidden md:inline-block rounded-full bg-cobalt px-5 py-2 font-mono text-xs uppercase tracking-widest text-parchment transition-colors hover:bg-cobaltDim"
        >
          Run Diagnostic
        </NavLink>

        <button
          className="md:hidden text-parchment"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <ul className="md:hidden flex flex-col gap-4 border-t border-white/5 px-6 py-6 font-mono text-sm uppercase tracking-widest">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) => (isActive ? "text-amber" : "text-mist")}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
