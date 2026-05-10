import AnimatedGrid from "./components/AnimatedGrid";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProfileDifferentiator from "./components/ProfileDifferentiator";
import ValueSnapshot from "./components/ValueSnapshot";
import DecisionWorkflow from "./components/DecisionWorkflow";
import DecisionFramework from "./components/DecisionFramework";
import DecisionProblems from "./components/DecisionProblems";
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
    <div className="relative min-h-screen text-white antialiased">
      <AnimatedGrid />
      <Navbar />

      <main>
        {/* 1. Hero command center */}
        <Hero />

        {/* 2. Why this profile stands out */}
        <ProfileDifferentiator />

        {/* 3. Employer value snapshot */}
        <ValueSnapshot />

        {/* 4. Decision analytics workflow (interactive) */}
        <DecisionWorkflow />

        {/* 5. How I turn data into decisions */}
        <DecisionFramework />

        {/* 6. Decision problems I can help solve */}
        <DecisionProblems />

        {/* 7. Featured case studies */}
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
  );
}
