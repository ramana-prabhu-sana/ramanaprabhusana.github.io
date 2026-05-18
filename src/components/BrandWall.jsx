import { motion } from "motion/react";
import Container from "./Container";

/**
 * Trust strip - logos of the institutions Ramana has worked for or trained
 * at. Renders just above ProfileDifferentiator so recruiters anchor on
 * brand-name credibility before they read prose claims.
 *
 * Wordmark vs. avatar choice:
 * - Every logo here is a clean wordmark SVG, flattened to a white
 *   silhouette so six different brand styles read as one consistent set.
 * - Square 'avatar' versions live at genpact.png / vit.png / purdue.svg
 *   for the circular ProfileSnapshot, Experience, and Education avatars -
 *   intentional dual files; do not repoint those at the wordmarks.
 */
const LOGOS = [
  { src: "/brand/novartis-wordmark.svg", alt: "Novartis", height: 22 },
  { src: "/brand/zs.svg", alt: "ZS Associates", height: 22 },
  { src: "/brand/genpact-wordmark.svg", alt: "Genpact", height: 20 },
  { src: "/brand/pharmaace.svg", alt: "PharmaACE", height: 22 },
  { src: "/brand/purdue-wordmark.svg", alt: "Purdue University, Daniels School of Business", height: 16 },
  { src: "/brand/vit-wordmark.svg", alt: "Vellore Institute of Technology", height: 16 },
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
