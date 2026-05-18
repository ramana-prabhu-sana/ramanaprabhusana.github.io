import { motion } from "motion/react";
import Container from "./Container";

/**
 * Trust strip - logos of the institutions Ramana has worked for or trained
 * at. Renders just above ProfileDifferentiator so recruiters anchor on
 * brand-name credibility before they read prose claims.
 *
 * Wordmark vs. avatar choice:
 * - Novartis + Genpact use the wordmark SVGs here (clean grayscale).
 *   The square 'avatar' versions live at novartis.svg / genpact.png
 *   for the circular Experience timeline avatars - intentional dual files.
 * - VIT seal is dense, so it gets +8px height vs the wordmarks so the
 *   internal detail stays readable when greyscaled.
 */
const LOGOS = [
  { src: "/brand/novartis-wordmark.svg", alt: "Novartis", height: 22 },
  { src: "/brand/zs.svg", alt: "ZS Associates", height: 22 },
  { src: "/brand/genpact-wordmark.svg", alt: "Genpact", height: 20 },
  { src: "/brand/pharmaace.svg", alt: "PharmaACE", height: 22 },
  { src: "/brand/purdue.svg", alt: "Purdue University, Daniels School of Business", height: 16 },
  { src: "/brand/vit.png", alt: "Vellore Institute of Technology", height: 34 },
];

export default function BrandWall() {
  return (
    <section
      aria-label="Companies and institutions"
      className="relative py-8"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-white/10 bg-white/[0.05] px-6 py-5 backdrop-blur"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="shrink-0 text-[10px] font-mono uppercase tracking-[0.2em] text-white/55 sm:max-w-[120px]">
              Worked at · trained at
            </div>
            <div className="flex flex-1 flex-wrap items-center gap-x-7 gap-y-4 sm:justify-end">
              {LOGOS.map((logo) => (
                <img
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  style={{ height: `${logo.height}px` }}
                  // brightness-0 + invert collapses every logo to a clean
                  // white silhouette on the dark page (works because all
                  // six sources have transparent backgrounds). opacity-80
                  // -> 100 on hover gives a subtle lift without changing
                  // the visual rhythm.
                  className="w-auto select-none object-contain opacity-80 brightness-0 invert transition-opacity duration-300 hover:opacity-100"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
