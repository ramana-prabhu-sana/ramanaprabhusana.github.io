import React from "react";
import Container from "../components/Container.jsx";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import { profile } from "../data/profile.js";

export default function Resume() {
  const pdfUrl = profile.resume.pdfPath;

  return (
    <div className="py-12">
      <Container>
        <div className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight">Resume</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            If the embedded viewer does not load, use the download button.
          </p>
          <div className="mt-4">
            <a href={pdfUrl} download>
              <Button>Download PDF</Button>
            </a>
          </div>
        </div>

        <Card className="overflow-hidden">
          <div className="h-[75vh] w-full">
            <iframe title="Resume PDF" src={pdfUrl} className="h-full w-full" loading="lazy" />
          </div>
        </Card>
      </Container>
    </div>
  );
}
