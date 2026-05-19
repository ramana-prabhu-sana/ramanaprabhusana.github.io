import { useEffect, useState, useCallback } from "react";
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

/*
 * Routed pages (no router dependency).
 *
 * The site used to be ONE ~31,000px page. Mobile iOS WebKit cannot
 * reliably paint a page that tall - below-the-fold content rendered
 * black/washed-out on scroll on iPhone while desktop was fine. The fix
 * is structural: split the single scroll into short routed pages so the
 * browser only ever renders ~one screen worth of DOM at a time.
 */

const PAGES = {
  "/": {
    label: "Home",
    render: () => (
      <>
        <Hero />
        <ProfileDifferentiator />
        <TestimonialMarquee />
      </>
    ),
  },
  "/approach": {
    label: "Approach",
    render: () => (
      <>
        <DecisionWorkflow />
        <LaunchForecastDemo />
      </>
    ),
  },
  "/industry": {
    label: "Industry",
    render: () => <IndustryHighlights />,
  },
  "/projects": {
    label: "Projects",
    render: () => <CaseStudies />,
  },
  "/experience": {
    label: "Experience",
    render: () => (
      <>
        <ExperienceTimeline />
        <Recognition />
      </>
    ),
  },
  "/skills": {
    label: "Skills",
    render: () => (
      <>
        <SkillsIntelligenceMap />
        <Education />
        <Certifications />
      </>
    ),
  },
  "/contact": {
    label: "Contact",
    render: () => (
      <>
        <Testimonials />
        <RecruiterCTA />
        <Contact />
      </>
    ),
  },
};

// Nav order shown in the navbar.
export const NAV = [
  "/",
  "/approach",
  "/industry",
  "/projects",
  "/experience",
  "/skills",
  "/contact",
].map((path) => ({ path, label: PAGES[path].label }));

// Any in-page section id / old deep-link slug -> the route that now
// contains it. Keeps every existing `href="#section"` link working
// without touching dozens of components.
const SECTION_ROUTE = {
  home: "/",
  strengths: "/",
  why: "/",
  testimonials: "/contact",
  recommendations: "/contact",
  contact: "/contact",
  approach: "/approach",
  workflow: "/approach",
  "forecast-demo": "/approach",
  industry: "/industry",
  "industry-highlights": "/industry",
  projects: "/projects",
  "case-studies": "/projects",
  experience: "/experience",
  recognition: "/experience",
  "proof-of-work": "/experience",
  skills: "/skills",
  education: "/skills",
  certifications: "/skills",
};

function normalizePath(p) {
  const clean = (p || "/").split(/[?#]/)[0].replace(/\/+$/, "");
  const path = clean === "" ? "/" : clean;
  if (PAGES[path]) return path;
  // old deep links like /strengths or /case-studies -> mapped route
  const seg = path.replace(/^\/+/, "");
  if (SECTION_ROUTE[seg]) return SECTION_ROUTE[seg];
  return "/";
}

export default function App() {
  const [path, setPath] = useState(() => {
    // 404.html stashes the requested path here then bounces to "/".
    let entry = window.location.pathname;
    try {
      const stored = sessionStorage.getItem("scrollTo");
      if (stored) {
        sessionStorage.removeItem("scrollTo");
        entry = "/" + stored;
      }
    } catch {
      /* sessionStorage blocked - fall back to location */
    }
    return normalizePath(entry);
  });

  const navigate = useCallback(
    (to, { replace = false } = {}) => {
      const next = normalizePath(to);
      const url = next;
      if (replace) window.history.replaceState(null, "", url);
      else window.history.pushState(null, "", url);
      setPath(next);
      window.scrollTo(0, 0);
    },
    []
  );

  // Keep the URL canonical on first paint (e.g. "/strengths" -> "/").
  useEffect(() => {
    const current = window.location.pathname.replace(/\/+$/, "") || "/";
    if (current !== path) {
      window.history.replaceState(null, "", path);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Back/forward.
  useEffect(() => {
    const onPop = () => {
      setPath(normalizePath(window.location.pathname));
      window.scrollTo(0, 0);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Global internal-link interceptor. Any <a href="#x"> or <a href="/x">
  // becomes client-side route navigation (same-page anchors still smooth
  // scroll). Lets every existing component link work unchanged.
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest && e.target.closest("a[href]");
      if (!a) return;
      if (a.target && a.target !== "" && a.target !== "_self") return;
      const href = a.getAttribute("href");
      if (!href) return;

      let id = null;
      if (href.startsWith("#")) id = href.slice(1);
      else if (href.startsWith("/") && !href.startsWith("//"))
        id = href.slice(1).split(/[/?#]/)[0];
      else return; // external / mailto / tel

      if (id === "" ) {
        // bare "/" -> Home
        e.preventDefault();
        if (path !== "/") navigate("/");
        else window.scrollTo(0, 0);
        return;
      }
      if (id === "main") return; // skip-to-content, same page

      const route = PAGES["/" + id]
        ? "/" + id
        : SECTION_ROUTE[id] || null;
      if (!route) return; // unknown - let the browser handle it

      e.preventDefault();
      if (route !== path) {
        navigate(route);
        // after the new page mounts, try to land on the specific section
        const elId = id;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            const el = document.getElementById(elId);
            if (el) el.scrollIntoView({ block: "start" });
          })
        );
      } else {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else window.scrollTo(0, 0);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [path, navigate]);

  const page = PAGES[path] || PAGES["/"];

  return (
    <MotionConfig reducedMotion="always">
      <div className="relative min-h-screen text-white antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:border focus:border-lime-400/50 focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-lime-300"
        >
          Skip to main content
        </a>

        <AnimatedGrid />
        <ScrollProgress />
        <Navbar currentPath={path} onNavigate={navigate} />

        <main id="main">{page.render()}</main>

        <Footer />
      </div>
    </MotionConfig>
  );
}
