import { Link } from "react-router-dom";

const stages = [
  { tag: "Source", title: "Greenhouse API", body: "verified job boards" },
  { tag: "Evidence", title: "Raw snapshot", body: "exact bytes to private R2, before anything else" },
  { tag: "Validate", title: "Canonical model", body: "content hash, idempotent", quarantine: true },
  { tag: "Store", title: "PostgreSQL", body: "immutable versions, observations, runs", highlight: true },
  { tag: "Serve", title: "FastAPI", body: "public reads, guarded admin routes" },
];

const decisions = [
  {
    title: "01 — Re-runs are safe",
    body: "Deterministic content hashes mean an unchanged listing refreshes its observation instead of creating a duplicate job or a new version.",
  },
  {
    title: "02 — Failure isn't removal",
    body: "A network error or failed source run is recorded as an operational fact, never treated as evidence that an employer took a job down.",
  },
  {
    title: "03 — One writer at a time",
    body: "PostgreSQL advisory locks and explicit transaction boundaries keep concurrent syncs from corrupting history.",
  },
];

const Stage = ({ stage }) => (
  <div
    className={`flex-1 min-w-0 rounded-[10px] border bg-brand-surface p-4 flex flex-col gap-1.5 ${
      stage.highlight ? "border-brand-gold" : "border-brand-border"
    }`}
  >
    <span className={`font-mono text-[11px] uppercase ${stage.highlight ? "text-brand-gold" : "text-brand-muted"}`}>
      {stage.tag}
    </span>
    <strong className="text-[15px] font-semibold text-brand-text">{stage.title}</strong>
    <span className="text-[13px] leading-snug text-brand-muted">{stage.body}</span>
  </div>
);

const Arrow = () => (
  <div aria-hidden="true" className="flex items-center justify-center text-brand-muted/60 font-mono py-1 lg:py-0 lg:px-2 lg:self-start lg:pt-10">
    <span className="rotate-90 lg:rotate-0">→</span>
  </div>
);

const CaseStudy = () => (
  <section id="case" className="page-shell border-t border-brand-border">
    <div className="mx-auto max-w-6xl py-20 md:py-24">
      <p className="mb-3.5 font-mono text-[13px] uppercase tracking-[0.12em] text-brand-gold">
        Case study · OpenRole Observatory
      </p>
      <h2 className="text-[clamp(1.9rem,3.4vw,2.75rem)] font-bold leading-tight tracking-[-0.02em] text-brand-text max-w-[26ch]">
        An ingestion pipeline where every record can be traced back to its source.
      </h2>
      <p className="mt-4 text-[17px] leading-relaxed text-brand-muted max-w-[66ch]">
        Employers change or delete job listings without a trace. OpenRole keeps the evidence: the exact
        bytes it received, what changed, and when it last checked.
      </p>

      <figure className="mt-12 rounded-2xl border border-brand-border bg-brand-bg p-5 sm:p-7 shadow-[inset_0_0_0_1px_rgb(var(--brand-border)/0.3)]">
        <figcaption className="sr-only">
          Pipeline: Greenhouse API, raw snapshot in R2, validation to a canonical model with invalid
          records quarantined, PostgreSQL storage, served by FastAPI.
        </figcaption>
        <ol className="flex flex-col lg:flex-row lg:items-start">
          {stages.map((stage, i) => (
            <li key={stage.title} className="contents">
              {stage.quarantine ? (
                <div className="flex-1 min-w-0 flex flex-col gap-2.5">
                  <Stage stage={stage} />
                  <div className="rounded-[10px] border border-dashed border-brand-gold/50 bg-brand-gold/5 px-3.5 py-2.5">
                    <span className="block font-mono text-[11px] text-brand-gold">↳ QUARANTINE</span>
                    <span className="text-xs text-brand-muted">invalid records kept with diagnostics</span>
                  </div>
                </div>
              ) : (
                <Stage stage={stage} />
              )}
              {i < stages.length - 1 && <Arrow />}
            </li>
          ))}
        </ol>
      </figure>

      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {decisions.map((d) => (
          <div key={d.title} className="flex flex-col gap-2">
            <span className="font-mono text-xs text-brand-gold">{d.title}</span>
            <p className="text-[15px] leading-relaxed text-brand-text/80">{d.body}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 flex flex-wrap gap-6 font-medium">
        <Link to="/projects/openrole-observatory" className="text-brand-gold hover:underline underline-offset-4">
          Read the full case study →
        </Link>
        <a
          href="https://openrole-observatory.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-muted hover:text-brand-text"
        >
          Live demo ↗
        </a>
      </p>
    </div>
  </section>
);

export default CaseStudy;
