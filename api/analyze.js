// Vercel serverless function: POST /api/analyze
// Deploy target: Vercel (or adapt for Netlify Functions / Express).
// Requires env var GROQ_API_KEY set in your hosting dashboard — never in client code.
// Get a free key at https://console.groq.com/keys (no credit card required).

import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Free, fast Llama model hosted by Groq. See https://console.groq.com/docs/models
// for the current list if this one is ever deprecated.
const MODEL = "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `You are an expert technical recruiter and resume coach.
You will be given a candidate's resume text, and optionally a target job description.
Respond with ONLY a JSON object, no markdown fences, no preamble, matching this exact shape:
{
  "score": <integer 0-100, overall resume strength>,
  "summary": "<2-3 sentence overall assessment>",
  "strengths": ["<short strength 1>", "<short strength 2>", "<short strength 3>"],
  "improvements": ["<short actionable improvement 1>", "<short actionable improvement 2>", "<short actionable improvement 3>"]
}`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({ error: "Resume text is too short." });
    }

    const userPrompt = jobDescription
      ? `Resume:\n${resumeText}\n\nTarget job description:\n${jobDescription}`
      : `Resume:\n${resumeText}`;

    const response = await groq.chat.completions.create({
      model: MODEL,
      max_tokens: 1000,
      response_format: { type: "json_object" }, // forces valid JSON back
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
    });

    const raw = response.choices[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(raw);

    return res.status(200).json(parsed);
  } catch (err) {
    console.error("Analyze error:", err);
    return res.status(500).json({ error: "Something went wrong analyzing the resume." });
  }
}
