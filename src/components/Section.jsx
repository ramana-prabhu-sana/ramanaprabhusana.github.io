import Container from "./Container";

export default function Section({ id, title, subtitle, children, className = "" }) {
  return (
    <section id={id} className={`py-14 scroll-mt-24 ${className}`}>
      <Container>
        <div className="mb-8">
          {title ? <h2 className="text-2xl font-semibold tracking-tight">{title}</h2> : null}
          {subtitle ? (
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{subtitle}</p>
          ) : null}
        </div>
        {children}
      </Container>
    </section>
  );
}
