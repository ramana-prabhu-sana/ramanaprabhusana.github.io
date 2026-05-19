import { useEffect } from "react";
import { MotionConfig } from "motion/react";
import AnimatedGrid from "./components/AnimatedGrid";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TestimonialMarquee from "./components/TestimonialMarquee";
import ProfileDifferentiator from "./components/ProfileDifferentiator";
import DecisionWorkflow from "./components/DecisionWorkflow";
import IndustryHighlights from "./components/IndustryHighlights";
import LaunchForecastDemo from "./components/LaunchForecastDemo";
import CaseStudies from "./components/CaseStudies";
import ExperienceTimeline from "./components/ExperienceTimeline";
import SkillsIntelligenceMap from "./components/SkillsIntelligenceMap";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import Recognition from "./components/Recognition";
import Testimonials from "./components/Testimonials";
import RecruiterCTA from "./components/RecruiterCTA";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Hash-free section navigation: convert all in-page anchor URLs from
// '/#education' to '/education'. Three pieces working together:
//   1. Global click interceptor: when any <a href="#section"> is clicked,
//      preventDefault, smooth-scroll to the section, and replaceState the
//      URL to '/section' (no hash).
//   2. Initial mount: handle three entry paths - (a) sessionStorage value
//      set by 404.html on a deep-link refresh, (b) location.pathname like
//      '/education' that matches a section id, (c) legacy '#education'
//      hash from old shared links.
//   3. Native anchor behavior remains as a no-JS fallback (the href is
//      still '#section', so a JS-disabled browser jumps to the right
//      anchor and just keeps the hash in the URL).
function useCleanSectionUrls() {
  useEffect(() => {
    const isInternalAnchor = (href) =>
      typeof href === "string" && href.startsWith("#") && href.length > 1;

    const scrollToId = (id, behavior = "smooth") => {
      const el = document.getElementById(id);
      if (!el) return false;
      el.scrollIntoView({ behavior, block: "start" });
      return true;
    };

    // (3) On first mount, resolve the entry path to a section id.
    const stored = sessionStorage.getItem("scrollTo");
    if (stored) {
      sessionStorage.removeItem("scrollTo");
      // Defer so the section DOM is mounted.
      requestAnimationFrame(() => {
        if (scrollToId(stored, "instant")) {
          window.history.replaceState(null, "", `/${stored}`);
        } else {
          window.history.replaceState(null, "", "/");
        }
      });
    } else {
      const path = window.location.pathname.replace(/^\/+/, "").replace(/\/+$/, "");
      const hash = window.location.hash.slice(1);
      const target = path || hash;
      if (target) {
        requestAnimationFrame(() => {
          if (scrollToId(target, "instant")) {
            window.history.replaceState(null, "", `/${target}`);
          }
        });
      }
    }

    // (1) Global click interceptor for in-page anchor links.
    const onClick = (e) => {
      // Respect modifier keys / non-primary clicks (open in new tab, etc.).
      if (e.defaultPrevented) return;
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = e.target.closest && e.target.closest("a[href]");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "" && anchor.target !== "_self") return;

      const href = anchor.getAttribute("href");
      if (!isInternalAnchor(href)) return;

      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `/${id}`);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}

export default function App() {
  useCleanSectionUrls();

  return (
    // reducedMotion="always": snap every motion.* opacity/transform
    // animation straight to its final visible state for ALL visitors.
    // iOS WebKit was unreliable at running the entrance fades, leaving
    // below-the-fold sections stuck faint/invisible on iPhone. Snapping
    // to the end state makes content unconditionally visible on every
    // browser with zero animation dependency. Reversible once an
    // iOS-safe reveal approach is validated.
    <MotionConfig reducedMotion="always">
    <div className="relative min-h-screen text-white antialiased">
      {/* Skip-to-content link for keyboard + screen-reader users. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:border focus:border-lime-400/50 focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-lime-300"
      >
        Skip to main content
      </a>

      <AnimatedGrid />
      <ScrollProgress />
      <Navbar />

      <main id="main">
        {/* 1. Hero command center */}
        <Hero />

        {/* 1a. Rotating LinkedIn-recommendation pull quotes */}
        <TestimonialMarquee />

        {/* 2. Why this profile stands out (Strengths nav) */}
        <ProfileDifferentiator />

        {/* 3. Decision analytics workflow (Approach nav) */}
        <DecisionWorkflow />

        {/* 4. Industry highlights - redacted real-world commercial work */}
        <IndustryHighlights />

        {/* 4a. Interactive forecasting demo - the credibility centerpiece */}
        <LaunchForecastDemo />

        {/* 5. Featured case studies */}
        <CaseStudies />

        {/* 8. Experience timeline */}
        <ExperienceTimeline />

        {/* 9. Skills intelligence map */}
        <SkillsIntelligenceMap />

        {/* 10. Education */}
        <Education />

        {/* 11. Certifications */}
        <Certifications />

        {/* 12. Proof of work */}
        <Recognition />

        {/* 13. Testimonials - LinkedIn recommendations */}
        <Testimonials />

        {/* 14. Recruiter CTA */}
        <RecruiterCTA />

        {/* 14. Contact */}
        <Contact />
      </main>

      <Footer />
    </div>
    </MotionConfig>
  );
}
