import { useState, useRef } from "react";
import { CheckCircle2, AlertCircle, SendHorizontal, UploadCloud, FileText, X } from "lucide-react";
import ScoreGauge from "../components/ScoreGauge.jsx";
import Loader from "../components/Loader.jsx";
import { analyzeResume } from "../services/aiService.js";
import { extractTextFromPdf } from "../utils/pdfExtract.js";

export default function Analyzer() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [fileName, setFileName] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  async function handleFile(file) {
    if (!file) return;
    setError("");
    setResult(null);
    setExtracting(true);
    try {
      const text = await extractTextFromPdf(file);
      setResumeText(text);
      setFileName(file.name);
    } catch (err) {
      setError(err.message || "Couldn't read that PDF.");
      setFileName("");
    } finally {
      setExtracting(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  }

  function clearFile() {
    setFileName("");
    setResumeText("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const data = await analyzeResume(resumeText, jobDescription);
      setResult(data);
    } catch (err) {
      setError(err?.response?.data?.error || err.message || "Analysis failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-12 max-w-xl">
        <span className="font-mono text-xs uppercase tracking-widest text-amber">
          Run diagnostic
        </span>
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-parchment mt-3">
          Upload or paste your resume.
        </h1>
        <p className="text-mist mt-4 leading-relaxed">
          Drop a PDF and we'll pull the text automatically, or paste it in
          directly below. Optionally add the job description you're
          targeting for a tailored read. Nothing you submit is stored.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* PDF dropzone */}
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-mist">
              Resume PDF (optional)
            </label>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`mt-2 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
                dragActive
                  ? "border-cobalt bg-cobalt/5"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />

              {fileName ? (
                <div className="flex items-center gap-2 font-mono text-sm text-parchment">
                  <FileText className="h-4 w-4 text-amber" />
                  {fileName}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearFile();
                    }}
                    className="text-mist hover:text-[#E8552F]"
                    aria-label="Remove file"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <UploadCloud className="h-6 w-6 text-mist" />
                  <p className="font-mono text-xs uppercase tracking-widest text-mist">
                    {extracting ? "Reading PDF…" : "Drop a PDF here or click to browse"}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-mist">or</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div>
            <label htmlFor="resume" className="font-mono text-xs uppercase tracking-widest text-mist">
              Resume text
            </label>
            <textarea
              id="resume"
              value={resumeText}
              onChange={(e) => {
                setResumeText(e.target.value);
                if (fileName) setFileName(""); // editing manually detaches from the uploaded file
              }}
              placeholder="Paste your resume content here…"
              rows={10}
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-panel p-4 text-sm text-parchment placeholder:text-mist/60 focus:border-cobalt outline-none resize-y"
            />
          </div>

          <div>
            <label htmlFor="jd" className="font-mono text-xs uppercase tracking-widest text-mist">
              Target job description (optional)
            </label>
            <textarea
              id="jd"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste a job posting to tailor the analysis…"
              rows={5}
              className="mt-2 w-full rounded-xl border border-white/10 bg-panel p-4 text-sm text-parchment placeholder:text-mist/60 focus:border-cobalt outline-none resize-y"
            />
          </div>

          <button
            type="submit"
            disabled={loading || extracting}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-cobalt px-6 py-3 font-mono text-xs uppercase tracking-widest text-parchment hover:bg-cobaltDim transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Analyzing…" : "Analyze resume"} <SendHorizontal className="h-4 w-4" />
          </button>

          {loading && <Loader />}
          {error && (
            <p className="flex items-center gap-2 text-sm text-[#E8552F]">
              <AlertCircle className="h-4 w-4 shrink-0" /> {error}
            </p>
          )}
        </form>

        <div className="rounded-2xl border border-white/5 bg-panel p-8 flex flex-col items-center justify-center min-h-[420px]">
          {!result && !loading && (
            <p className="font-mono text-xs uppercase tracking-widest text-mist text-center">
              Your reading will appear here
            </p>
          )}

          {loading && <Loader label="Running diagnostic" />}

          {result && (
            <div className="w-full flex flex-col items-center gap-6">
              <ScoreGauge score={result.score} />
              <p className="text-sm text-mist text-center leading-relaxed max-w-sm">
                {result.summary}
              </p>

              <div className="w-full grid sm:grid-cols-2 gap-6 mt-2">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-amber mb-3">
                    Strengths
                  </h3>
                  <ul className="space-y-2">
                    {result.strengths?.map((s, i) => (
                      <li key={i} className="flex gap-2 text-sm text-parchment">
                        <CheckCircle2 className="h-4 w-4 text-cobalt shrink-0 mt-0.5" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-amber mb-3">
                    Improve
                  </h3>
                  <ul className="space-y-2">
                    {result.improvements?.map((s, i) => (
                      <li key={i} className="flex gap-2 text-sm text-parchment">
                        <AlertCircle className="h-4 w-4 text-[#E8552F] shrink-0 mt-0.5" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}