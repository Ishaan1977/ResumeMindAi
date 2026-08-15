/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F1420",
        panel: "#161D2E",
        parchment: "#EDE6D6",
        parchmentDim: "#DCD3BC",
        cobalt: "#3D5AFE",
        cobaltDim: "#2A3FB8",
        amber: "#FFB020",
        mist: "#8A93A6",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'IBM Plex Sans'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(138,147,166,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(138,147,166,0.08) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      keyframes: {
        sweep: {
          "0%": { transform: "rotate(-120deg)" },
          "100%": { transform: "rotate(var(--needle-angle, 0deg))" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        sweep: "sweep 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        floatSlow: "floatSlow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
