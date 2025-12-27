import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import CommandPalette from "./components/CommandPalette";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Resume from "./pages/Resume";
import CaseStudy from "./pages/CaseStudy";

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        <ScrollProgress />
        <NavBar />
        <CommandPalette />

        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/case-studies/:slug" element={<CaseStudy />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
        <BackToTop />
      </div>
    </HashRouter>
  );
}
