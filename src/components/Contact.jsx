import { useState } from "react";
import { Download, Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import Container from "./Container";
import Card from "./Card";
import Button from "./Button";
import SectionHeading from "./SectionHeading";
import { profile } from "../data/profile";

function ChannelTile({ icon: Icon, label, value, href, accent = "lime" }) {
  const accentColor = {
    lime: "border-lime-400/30 bg-lime-400/10 text-lime-300",
    cyan: "border-cyan-400/30 bg-cyan-400/10 text-cyan-300",
    violet: "border-violet-400/30 bg-violet-400/10 text-violet-300",
    rose: "border-rose-400/30 bg-rose-400/10 text-rose-300",
    amber: "border-amber-300/30 bg-amber-300/10 text-amber-200",
    sky: "border-sky-400/30 bg-sky-400/10 text-sky-300",
  }[accent];

  const inner = (
    <div className="flex items-center gap-4">
      <div className={["grid h-11 w-11 shrink-0 place-items-center rounded-xl border", accentColor].join(" ")}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] font-semibold uppercase tracking-widest text-white/45">
          {label}
        </div>
        <div className="mt-0.5 truncate text-sm font-medium text-white">
          {value}
        </div>
      </div>
    </div>
  );

  if (!href) {
    return (
      <Card padded className="hover:bg-ink-900/85">
        {inner}
      </Card>
    );
  }

  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className="block rounded-2xl"
    >
      <Card padded className="hover:bg-ink-900/85">
        {inner}
      </Card>
    </a>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const subject = `Portfolio inquiry from ${form.name || "(no name)"}`;
    const body = [
      `Name: ${form.name || "-"}`,
      `Email: ${form.email || "-"}`,
      "",
      form.message || "(no message)",
    ].join("\n");

    const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;

    // Reset state after a brief moment so the button doesn't stay disabled
    setTimeout(() => setSubmitting(false), 800);
  };

  return (
    <section id="contact" className="relative scroll-mt-24 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Get in touch"
          title="Let's talk analytics, decisions, and what to build next"
          subtitle="Email is fastest. The form below opens your default mail client pre-filled."
          accent="lime"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          {/* Channels */}
          <div className="grid gap-3">
            <ChannelTile
              icon={Mail}
              label="Email"
              value={profile.email}
              href={profile.links.email}
              accent="lime"
            />
            <ChannelTile
              icon={Linkedin}
              label="LinkedIn"
              value="linkedin.com/in/ramanaprabhusana"
              href={profile.links.linkedin}
              accent="cyan"
            />
            <ChannelTile
              icon={Github}
              label="GitHub"
              value="github.com/ramanaprabhusana"
              href={profile.links.github}
              accent="violet"
            />
            <ChannelTile
              icon={Download}
              label="Resume"
              value="Download PDF"
              href={profile.links.resume}
              accent="amber"
            />
            <ChannelTile
              icon={MapPin}
              label="Location"
              value={profile.location}
              accent="rose"
            />
            <ChannelTile
              icon={Phone}
              label="Phone"
              value={profile.phone}
              href={`tel:${profile.phone.replace(/[^0-9+]/g, "")}`}
              accent="sky"
            />
          </div>

          {/* Form */}
          <Card accent="lime" className="flex flex-col">
            <h3 className="text-lg font-semibold tracking-tight text-white">
              Send a message
            </h3>
            <p className="mt-1 text-sm text-white/60">
              The form opens your mail app with everything ready to send.
            </p>

            <form onSubmit={onSubmit} className="mt-5 grid gap-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-medium text-white/80"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={onChange}
                  required
                  autoComplete="name"
                  className="mt-1.5 block w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/35 outline-none focus:border-lime-400/50 focus:bg-white/8"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-medium text-white/80"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  autoComplete="email"
                  className="mt-1.5 block w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/35 outline-none focus:border-lime-400/50 focus:bg-white/8"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-medium text-white/80"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={onChange}
                  required
                  className="mt-1.5 block w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/35 outline-none focus:border-lime-400/50 focus:bg-white/8"
                  placeholder="A short note about the role or project."
                />
              </div>

              <div className="flex items-center justify-end gap-3">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  icon={Send}
                  iconPosition="right"
                  disabled={submitting}
                >
                  {submitting ? "Opening…" : "Send message"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </Container>
    </section>
  );
}
