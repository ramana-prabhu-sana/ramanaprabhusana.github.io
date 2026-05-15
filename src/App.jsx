import { MotionConfig } from "motion/react";
import AnimatedGrid from "./components/AnimatedGrid";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProfileDifferentiator from "./components/ProfileDifferentiator";
import DecisionWorkflow from "./components/DecisionWorkflow";
import CaseStudies from "./components/CaseStudies";
import ExperienceTimeline from "./components/ExperienceTimeline";
import SkillsIntelligenceMap from "./components/SkillsIntelligenceMap";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import Recognition from "./components/Recognition";
import RecruiterCTA from "./components/RecruiterCTA";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    // MotionConfig reducedMotion="user" makes every motion.* component
    // automatically short-circuit animations when the visitor has
    // prefers-reduced-motion: reduce set (accessibility + battery wins).
    <MotionConfig reducedMotion="user">
    <div className="relative min-h-screen text-white antialiased">
      {/* Skip-to-content link for keyboard + screen-reader users. */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:border focus:border-lime-400/50 focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-lime-300"
      >
        Skip to main content
      </a>

      <AnimatedGrid />
      <ScrollProgress />
      <Navbar />

      <main>
        {/* 1. Hero command center */}
        <Hero />

        {/* 2. Why this profile stands out (Strengths nav) */}
        <ProfileDifferentiator />

        {/* 3. Decision analytics workflow (Approach nav) */}
        <DecisionWorkflow />

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

        {/* 13. Recruiter CTA */}
        <RecruiterCTA />

        {/* 14. Contact */}
        <Contact />
      </main>

      <Footer />
    </div>
    </MotionConfig>
  );
}
