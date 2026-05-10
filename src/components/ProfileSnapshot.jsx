import { useMemo } from "react";
import { ArrowUpRight, Award, GraduationCap, Map } from "lucide-react";
import Avatar from "./Avatar";
import { education } from "../data/education";
import { certifications } from "../data/certifications";
import { recognition } from "../data/recognition";
import { skills } from "../data/skills";
import { caseStudies } from "../data/caseStudies";

/**
 * Three-zone hybrid card for the hero command panel:
 * 1. Education (Purdue MSBAIM anchor + cert count)
 * 2. Now (Currently / Recent / Available - hand-picked momentum signal)
 * 3. Domain coverage (top-5 skill domains by case count, real numbers)
 *
 * Every line is anchor-linked to its full section below the hero.
 */
export default function ProfileSnapshot() {
  const purdue = useMemo(
    () => education.find((e) => e.id === "purdue-msbaim") || education[0],
    []
  );

  const nowEntries = useMemo(() => {
    const byId = (id) => recognition.find((r) => r.id === id);
    return [
      {
        label: "Currently",
        title: byId("msbaim-practicum")?.title || "PharmaACE Practicum",
        href: "#recognition",
      },
      {
        label: "Recent",
        title: "Krenicki x Accenture",
        href: "#case-studies",
      },
      {
        label: "Recent",
        title: "FFAC 2026 - 3rd of 83 (Kaggle)",
        href: "#case-studies",
      },
      {
        label: "Available",
        title: purdue?.expectedGraduation || "Dec 2026",
        href: null,
      },
    ];
  }, [purdue]);

  const topDomains = useMemo(() => {
    const caseIds = new Set(caseStudies.map((c) => c.id));
    const ranked = skills
      .map((s) => ({
        id: s.id,
        title: s.title,
        count: s.relatedCases.filter((id) => caseIds.has(id)).length,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    const max = Math.max(1, ...ranked.map((d) => d.count));
    return { rows: ranked, max };
  }, []);

  return (
    <div
      className="w-full"
      aria-label="Profile snapshot - education, current activity, and skill breadth"
    >
      {/* Zone 1 - Education */}
      <div>
        <div className="mb-2 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-white/45">
          <span className="inline-flex items-center gap-1.5">
            <GraduationCap className="h-3 w-3" />
            Education
          </span>
          <a
            href="#certifications"
            className="inline-flex items-center gap-1 normal-case tracking-normal text-lime-300 hover:text-lime-200"
          >
            <Award className="h-3 w-3" />
            {certifications.length} certs
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>

        <a
          href="#education"
          className="group flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.03] p-3 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
        >
          <Avatar
            src={purdue.logo}
            alt={purdue.school}
            fallback="Purdue"
            size="sm"
            className="rounded-lg bg-white/95 p-1"
            imgClassName="object-contain"
          />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold leading-tight text-white">
              {purdue.degree.replace(
                "MS Business Analytics and Information Management",
                "MSBAIM"
              )}
            </div>
            <div className="mt-0.5 truncate text-[11px] text-white/55">
              Purdue Daniels School of Business
            </div>
            <div className="mt-1 flex items-center justify-between gap-2 text-[11px]">
              <span className="text-cyan-300">
                {purdue.focus || "Consulting + Data Science"}
              </span>
              <span className="font-mono text-[10px] text-white/40">
                Expected {purdue.expectedGraduation}
              </span>
            </div>
          </div>
        </a>
      </div>

      {/* Zone 2 - Now */}
      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-white/45">
          <span className="inline-flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime-400" />
            </span>
            Now
          </span>
        </div>

        <ul className="space-y-1">
          {nowEntries.map((row, i) => {
            const inner = (
              <div className="flex items-center gap-3 px-2 py-1.5">
                <span
                  className={[
                    "w-[68px] shrink-0 text-[10px] font-mono uppercase tracking-widest",
                    row.label === "Currently"
                      ? "text-lime-300"
                      : row.label === "Available"
                      ? "text-amber-200"
                      : "text-cyan-300",
                  ].join(" ")}
                >
                  {row.label}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm text-white/85">
                  {row.title}
                </span>
                {row.href ? (
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-white/30 transition-colors group-hover:text-white/70" />
                ) : null}
              </div>
            );
            return (
              <li key={`${row.label}-${i}`}>
                {row.href ? (
                  <a
                    href={row.href}
                    className="group block rounded-lg transition-colors hover:bg-white/[0.05]"
                  >
                    {inner}
                  </a>
                ) : (
                  <div>{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Zone 3 - Case studies by domain - dot-tally visual to avoid the
          "skill rating" look. Each filled dot = one real case study. */}
      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-white/45">
          <a
            href="#skills"
            className="inline-flex items-center gap-1.5 hover:text-white/70"
          >
            <Map className="h-3 w-3" />
            Case studies by domain
          </a>
          <span className="text-white/40">
            {caseStudies.length} cases / {skills.length} domains
          </span>
        </div>

        <ul className="space-y-0.5">
          {topDomains.rows.map(({ id, title, count }) => (
            <li key={id}>
              <a
                href="#skills"
                className="group grid grid-cols-[140px_1fr_auto] items-center gap-2 rounded-lg px-2 py-1.5 text-[11px] transition-colors hover:bg-white/[0.05]"
                aria-label={`${title}: ${count} of ${caseStudies.length} case studies - jump to skills map`}
              >
                <span className="truncate text-white/70" title={title}>
                  {shortDomain(title)}
                </span>
                <span className="flex items-center gap-1">
                  {Array.from({ length: count }).map((_, i) => (
                    <span
                      key={i}
                      className="h-2 w-2 rounded-sm bg-gradient-to-br from-lime-400 to-cyan-300"
                    />
                  ))}
                </span>
                <span className="inline-flex items-center gap-1 text-right">
                  <span className="font-mono text-[10px] text-white/70">
                    {count} {count === 1 ? "case" : "cases"}
                  </span>
                  <ArrowUpRight className="h-3 w-3 text-white/25 transition-colors group-hover:text-white/70" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function shortDomain(title) {
  return title
    .replace("Decision Analytics and Business Strategy", "Decision Strategy")
    .replace("Forecasting and Modeling", "Forecasting")
    .replace("Healthcare and Commercial Analytics", "Healthcare/Commercial")
    .replace("Business Intelligence and Visualization", "Business Intelligence")
    .replace("Data Science and Modeling", "Data Science")
    .replace("Data and Automation", "Data + Automation")
    .replace("Cloud, AI, and Modern Analytics", "Cloud + AI");
}
