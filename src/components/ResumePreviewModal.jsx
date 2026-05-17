import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Download, ExternalLink, X } from "lucide-react";
import { profile } from "../data/profile";

/**
 * Resume preview modal - renders the PDF inline via <object> with an
 * <iframe> fallback. On mobile / browsers without a PDF plugin the
 * fallback content shows a "Download Resume" CTA so the experience
 * degrades gracefully.
 *
 * Lazy-imported from Hero / RecruiterCTA so the PDF isn't fetched
 * until the user actually opens the preview.
 */
export default function ResumePreviewModal({ open, onClose }) {
  // Lock body scroll + Escape-to-close while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const resumeUrl = profile.links.resume;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[80] flex items-end justify-center bg-ink-950/85 px-2 py-2 backdrop-blur-md sm:items-center sm:px-6 sm:py-10"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-preview-title"
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/12 bg-ink-900/95 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3.5">
              <div className="min-w-0">
                <h2
                  id="resume-preview-title"
                  className="text-base font-semibold leading-tight text-white"
                >
                  Resume - Ramana Prabhu Sana
                </h2>
                <div className="mt-0.5 truncate text-[11px] text-white/55">
                  Preview inline - download or open in a new tab for the full file.
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={resumeUrl}
                  download
                  className="inline-flex items-center gap-1.5 rounded-lg border border-lime-400/40 bg-lime-400/15 px-3 py-1.5 text-xs font-medium text-lime-200 transition-colors hover:bg-lime-400/25"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download
                </a>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Open resume in new tab"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Open
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close resume preview"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/80 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* PDF viewer area */}
            <div className="relative flex-1 bg-ink-950">
              <object
                data={`${resumeUrl}#view=FitH`}
                type="application/pdf"
                className="h-[80vh] w-full sm:h-[78vh]"
                aria-label="Resume PDF preview"
              >
                {/* Fallback: most mobile browsers can't inline PDFs */}
                <div className="flex h-full min-h-[60vh] flex-col items-center justify-center gap-4 px-6 py-12 text-center">
                  <div className="text-sm text-white/70">
                    Inline PDF preview isn't supported in this browser.
                  </div>
                  <a
                    href={resumeUrl}
                    download
                    className="inline-flex items-center gap-2 rounded-lg border border-lime-400/40 bg-lime-400/15 px-4 py-2 text-sm font-medium text-lime-200 hover:bg-lime-400/25"
                  >
                    <Download className="h-4 w-4" />
                    Download Resume PDF
                  </a>
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-white/55 hover:text-white"
                  >
                    or open in a new tab
                  </a>
                </div>
              </object>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
