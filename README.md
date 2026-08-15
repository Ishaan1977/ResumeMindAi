# ResuMind AI

An AI-powered resume analyzer built with React. Paste a resume (and
optionally a target job description) and get back an instrument-style score,
a summary, and specific strengths/improvements — powered by Llama 3.3 via
Groq's free API.

Built as a portfolio project to demonstrate: a multi-page React app, a
custom design system (not a template), and a **secure** integration with an
LLM API (key stays server-side, never shipped to the browser).

## Folder structure

```
resumind-ai/
├── api/
│   └── analyze.js          # Serverless function — proxies requests to Claude
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ScoreGauge.jsx  # Signature instrument-dial visualization
│   │   ├── FeatureCard.jsx
│   │   ├── StepCard.jsx
│   │   └── Loader.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Features.jsx
│   │   ├── Analyzer.jsx    # Core AI feature — the resume analyzer form
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── services/
│   │   └── aiService.js    # Client-side wrapper that calls /api/analyze
│   ├── App.jsx              # Routes
│   ├── main.jsx              # Entry point
│   └── index.css
├── .env.example
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## Requirements

- Node.js 18+
- A free Groq API key (get one at https://console.groq.com/keys — no credit
  card required) if you want the live AI analysis to work. Without it,
  everything but the `/api/analyze` call still runs.

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Install the Groq SDK for the serverless function
npm install groq-sdk

# 3. Copy the env file and add your key
cp .env.example .env
# then edit .env and set GROQ_API_KEY=gsk_...

# 4. Run the frontend
npm run dev
```

The frontend alone runs at `http://localhost:5173`, but `/api/analyze`
needs a serverless runtime to actually work locally. The simplest path:

```bash
npm install -g vercel
vercel dev
```

`vercel dev` serves both the Vite app and the `/api` functions together
(the `vite.config.js` proxy assumes this on port 3000).

## Deploying

This project is set up for **Vercel** out of the box:

1. Push the repo to GitHub.
2. Import it in Vercel.
3. Add the `GROQ_API_KEY` environment variable in the Vercel project
   settings.
4. Deploy — Vercel automatically builds the Vite app and deploys
   `api/analyze.js` as a serverless function.

To deploy elsewhere (Netlify, Render, your own Node server), move the logic
in `api/analyze.js` into that platform's function/route format — the logic
itself (call Claude, return JSON) stays the same.

## Design notes

The whole UI is built around one idea: a resume is a signal that can be
measured, so the product should feel like an instrument panel reading it —
not a generic SaaS dashboard. That's why the score renders as an analog
gauge with tick marks and a sweeping needle (`ScoreGauge.jsx`) rather than a
plain progress bar, and why the type system leans on a monospace face for
data/labels the way a real instrument would.

## Tech stack

- **React 18** + **React Router 6** — SPA routing across 5 pages
- **Tailwind CSS** — utility-first styling with a custom design token set
- **Framer Motion** (installed, available for further scroll/hover polish)
- **lucide-react** — icon set
- **Axios** — HTTP client for the frontend → backend call
- **Groq SDK** (`groq-sdk`) — server-side only, in the serverless function;
  runs Llama 3.3 70B on Groq's free tier
