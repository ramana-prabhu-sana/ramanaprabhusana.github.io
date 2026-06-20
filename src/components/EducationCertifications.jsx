import Container from "./Container";
import SectionHeading from "./SectionHeading";
import Education from "./Education";
import Certifications from "./Certifications";

/*
 * Combined credentials band. Education and Certifications used to be two
 * full-height sections with their own headings - two separate "stop and
 * read" moments low in a very long page. They are the same kind of content
 * (what I studied / what I'm certified in) and already share the /skills
 * route on compact devices, so they fold into one section with a single
 * heading and two compact, still-anchored sub-blocks (#education,
 * #certifications). The navbar links to both anchors unchanged.
 */
export default function EducationCertifications() {
  return (
    <section className="relative scroll-mt-24 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Credentials"
          title="Education & certifications"
          subtitle="Graduate analytics training at Purdue, plus verifiable badges across data, BI, and cloud."
          accent="violet"
        />

        <div className="mt-12 space-y-14">
          <Education embedded />
          <Certifications embedded />
        </div>
      </Container>
    </section>
  );
}
