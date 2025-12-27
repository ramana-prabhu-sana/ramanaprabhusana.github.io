import React from "react";
import { useParams, Link } from "react-router-dom";
import { profile } from "../data/profile";
import Container from "../components/Container";
import Section from "../components/Section";

export default function CaseStudy() {
  const { slug } = useParams();

  const list = Array.isArray(profile?.caseStudies) ? profile.caseStudies : [];
  const cs = list.find((x) => x?.slug === slug);

  if (!cs) {
    return (
      <Container>
        <Section title="Case study not found">
          <p className="opacity-80">
            No case study exists for: <span className="font-mono">{slug}</span>
          </p>
          <div className="mt-4">
            <Link className="underline underline-offset-4" to="/projects">
              Back to Projects
            </Link>
          </div>
        </Section>
      </Container>
    );
  }

  const sections = Array.isArray(cs.sections) ? cs.sections : [];

  return (
    <Container>
      <Section title={cs.title || "Case Study"} subtitle={cs.subtitle || ""}>
        {sections.length ? (
          <div className="space-y-6">
            {sections.map((s, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-zinc-200/60 p-5 dark:border-zinc-800"
              >
                <h3 className="text-base font-semibold">{s.heading || "Section"}</h3>
                {s.body ? <p className="mt-2 opacity-85">{s.body}</p> : null}

                {Array.isArray(s.bullets) && s.bullets.length ? (
                  <ul className="mt-3 list-disc pl-5 opacity-85">
                    {s.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <p className="opacity-80">No sections added yet.</p>
        )}
      </Section>
    </Container>
  );
}
