import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;


export async function extractTextFromPdf(file) {
  if (file.type !== "application/pdf") {
    throw new Error("Please upload a PDF file.");
  }
  if (file.size > 10 * 1024 * 1024) {
    throw new Error("PDF is too large (max 10MB).");
  }

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(" ");
    fullText += pageText + "\n\n";
  }

  const trimmed = fullText.trim();
  if (trimmed.length < 20) {
    throw new Error(
      "Couldn't find readable text in this PDF — it may be a scanned image. Try pasting the text manually instead."
    );
  }

  return trimmed;
}