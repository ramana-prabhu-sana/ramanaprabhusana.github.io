import { useEffect, useState, useCallback } from "react";
import { MotionConfig } from "motion/react";
import { useReveal } from "./hooks/useReveal";
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
 * Hybrid shell.
 *
 * Desktop / laptop (wide + fine pointer): the original ONE long-scroll
 * page with in-page anchor nav - renders perfectly there.
 *
 * Phone / tablet / any touch device: the same sections split across
 * short ROUTED pages (~2-6k px each). Mobile iOS WebKit cannot paint the
 * ~31,000px single page (content goes black/washed-out on scroll), so
 * compact/touch devices get the routed shell, which paints reliably.
 *
 * Same section components feed both - only composition + nav differ.
 */

const PAGES = {
  "/": { label: "Home", render: () => (<><Hero /><ProfileDifferentiator /><TestimonialMarquee /></>) },
  "/approach": { label: "Approach", render: () => (<><DecisionWorkflow /><LaunchForecastDemo /></>) },
  "/industry": { label: "Industry", render: () => <IndustryHighlights /> },
  "/projects": { label: "Projects", render: () => <CaseStudies /> },
  "/experience": { label: "Experience", render: () => (<><ExperienceTimeline /><Recognition /></>) },
  "/skills": { label: "Skills", render: () => (<><SkillsIntelligenceMap /><Education /><Certifications /></>) },
  "/contact": { label: "Contact", render: () => (<><Testimonials /><RecruiterCTA /><Contact /></>) },
};

export const ROUTE_NAV = [
  "/", "/approach", "/industry", "/projects", "/experience", "/skills", "/contact",
].map((p) => ({ path: p, label: PAGES[p].label }));

// section id / old slug -> route that now contains it (compact mode)
const SECTION_ROUTE = {
  home: "/", strengths: "/", why: "/",
  testimonials: "/contact", recommendations: "/contact", contact: "/contact",
  approach: "/approach", workflow: "/approach", "forecast-demo": "/approach",
  industry: "/industry", "industry-highlights": "/industry",
  projects: "/projects", "case-studies": "/projects",
  experience: "/experience", recognition: "/experience", "proof-of-work": "/experience",
  skills: "/skills", education: "/skills", certifications: "/skills",
};

function routeFor(p) {
  const clean = (p || "/").split(/[?#]/)[0].replace(/\/+$/, "");
  const path = clean === "" ? "/" : clean;
  if (PAGES[path]) return path;
  return SECTION_ROUTE[path.replace(/^\/+/, "")] || "/";
}

// phones / tablets / any touch device -> routed shell
function useIsCompact() {
  const Q = "(max-width: 1024px), (pointer: coarse)";
  const [c, setC] = useState(() =>
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia(Q).matches
      : false
  );
  useEffect(() => {
    const m = window.matchMedia(Q);
    const on = () => setC(m.matches);
    m.addEventListener ? m.addEventListener("change", on) : m.addListener(on);
    return () =>
      m.removeEventListener
        ? m.removeEventListener("change", on)
        : m.removeListener(on);
  }, []);
  return c;
}

export default function App() {
  const compact = useIsCompact();
  // Scroll-triggered fade-in on any element with data-reveal. Idempotent;
  // hook scans the DOM once on mount and toggles `reveal-in` via IO.
  useReveal();

  // Mouse-follow spotlight via --spot-x / --spot-y CSS vars, viewport-
  // relative so the global .global-spotlight fixed layer tracks the
  // cursor across the entire page (not just the Hero band). Touch
  // devices skip the listener entirely and the CSS layer is gated to
  // (pointer: fine) so iOS WebKit never composites it. Throttled to
  // one paint per frame via rAF.
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;
    let raf = 0;
    let pendingX = 50;
    let pendingY = 25;
    const apply = () => {
      raf = 0;
      const root = document.documentElement;
      root.style.setProperty("--spot-x", pendingX + "%");
      root.style.setProperty("--spot-y", pendingY + "%");
    };
    const onMove = (e) => {
      pendingX = Math.round((e.clientX / window.innerWidth) * 100);
      pendingY = Math.round((e.clientY / window.innerHeight) * 100);
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const [path, setPath] = useState(() => {
    let entry = window.location.pathname;
    try {
      const s = sessionStorage.getItem("scrollTo");
      if (s) {
        sessionStorage.removeItem("scrollTo");
        entry = "/" + s;
        // stash so single-page mode can still scroll to the section
        window.__entrySection = s;
      }
    } catch {
      /* ignore */
    }
    return routeFor(entry);
  });

  const navigate = useCallback((to) => {
    const next = routeFor(to);
    window.history.pushState(null, "", next);
    setPath(next);
    window.scrollTo(0, 0);
  }, []);

  // popstate (both modes; harmless in single-page)
  useEffect(() => {
    const onPop = () => {
      setPath(routeFor(window.location.pathname));
      window.scrollTo(0, 0);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Mode-specific link handling + initial deep-link resolution.
  useEffect(() => {
    // Take control of scroll on history navigation - browsers (Safari
    // especially) otherwise restore stale scroll positions when routed
    // pages mount, dropping the user into the middle of /contact etc.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const scrollToId = (id, behavior) => {
      const el = document.getElementById(id);
      if (!el) return false;
      el.scrollIntoView({ behavior, block: "start" });
      return true;
    };

    // Anchor entry only comes from the cross-route sessionStorage handoff
    // or an explicit URL hash. The pathname is the route itself - NOT an
    // anchor target. Treating "/contact" as #contact scrolled past the
    // first two sections (Testimonials, RecruiterCTA) on that route.
    const entry =
      window.__entrySection || window.location.hash.slice(1) || null;
    if (!compact) {
      if (entry) {
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            if (scrollToId(entry, "instant"))
              window.history.replaceState(null, "", "/" + entry);
            else window.history.replaceState(null, "", "/");
          })
        );
      }
    } else {
      const current = window.location.pathname.replace(/\/+$/, "") || "/";
      if (current !== path) window.history.replaceState(null, "", path);
      if (entry) {
        const id = entry;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ block: "start" });
          })
        );
      } else {
        // No anchor - land at the top of the route. Explicit so Safari
        // scroll restoration cannot leave us mid-page.
        window.scrollTo(0, 0);
      }
    }

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
      if (id === "main") return;

      if (!compact) {
        // single-page: smooth scroll to the section, clean URL
        if (!id) return;
        const el = document.getElementById(id);
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", "/" + id);
        return;
      }

      // routed: navigate between pages
      if (id === "") {
        e.preventDefault();
        path !== "/" ? navigate("/") : window.scrollTo(0, 0);
        return;
      }
      const isRouteName = !!PAGES["/" + id];
      const route = isRouteName ? "/" + id : SECTION_ROUTE[id] || null;
      if (!route) return;
      e.preventDefault();
      if (route !== path) {
        navigate(route);
        if (!isRouteName) {
          // Anchor click into a different route - land on the target
          // section, not the top. Route-name clicks land at the top
          // (navigate already did scrollTo 0,0).
          const elId = id;
          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              const el = document.getElementById(elId);
              if (el) el.scrollIntoView({ block: "start" });
            })
          );
        }
      } else if (!isRouteName) {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else window.scrollTo(0, 0);
      } else {
        // Re-click on the current route's nav link - scroll to top.
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [compact, path, navigate]);

  const page = PAGES[path] || PAGES["/"];

  return (
    <MotionConfig reducedMotion="always">
      <div className="relative isolate min-h-screen text-white antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:border focus:border-lime-400/50 focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-lime-300"
        >
          Skip to main content
        </a>

        <AnimatedGrid />
        {/* Global mouse-follow spotlight. Fixed viewport layer that
            tracks --spot-x/--spot-y. CSS-gated to (pointer:fine) so
            touch devices never composite it. */}
        <div aria-hidden="true" className="global-spotlight" />
        {/* ScrollProgress is position:fixed - a mobile compositing
            trigger. Desktop only. */}
        {!compact && <ScrollProgress />}
        <Navbar compact={compact} currentPath={path} />

        {compact ? (
          <main id="main">{page.render()}</main>
        ) : (
          <main id="main">
            <Hero />
            <TestimonialMarquee />
            <ProfileDifferentiator />
            <DecisionWorkflow />
            <IndustryHighlights />
            <LaunchForecastDemo />
            <CaseStudies />
            <ExperienceTimeline />
            <SkillsIntelligenceMap />
            <Education />
            <Certifications />
            <Recognition />
            <Testimonials />
            <RecruiterCTA />
            <Contact />
          </main>
        )}

        <Footer />
      </div>
    </MotionConfig>
  );
}
