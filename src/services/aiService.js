import axios from "axios";

/**
 * All AI calls go through our own backend endpoint (/api/analyze), which
 * holds the Anthropic API key server-side. NEVER call the Anthropic/OpenAI
 * API directly from the browser with a real key — it would be exposed to
 * anyone who opens devtools. See /api/analyze.js for the serverless proxy.
 */
const client = axios.create({
  baseURL: "/api",
  timeout: 30000,
});

/**
 * Sends resume text (and an optional target job description) to the backend,
 * which forwards it to Claude and returns a structured analysis.
 *
 * @param {string} resumeText
 * @param {string} [jobDescription]
 * @returns {Promise<{score:number, summary:string, strengths:string[], improvements:string[]}>}
 */
export async function analyzeResume(resumeText, jobDescription = "") {
  if (!resumeText || resumeText.trim().length < 50) {
    throw new Error("Paste a bit more of your resume — at least a few sentences.");
  }

  const { data } = await client.post("/analyze", {
    resumeText,
    jobDescription,
  });

  return data;
}
