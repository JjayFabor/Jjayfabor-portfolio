import { Link } from "react-router-dom";

// `slug` links to the project's detail page; entries without one are client or
// internal work that has no public page yet.
const work = [
  {
    ctx: "Open source · AI agent",
    title: "Delphi",
    body: "A self-hosted personal AI agent on the Claude Agent SDK, reachable over Telegram and Discord, with persistent memory, teachable skills, MCP connectors and scheduled tasks.",
    stack: "Python · Claude Agent SDK · MCP · SQLite",
    slug: "delphi",
  },
  {
    ctx: "Callbox · Production",
    title: "RAG chat bot",
    body: "An AI-powered Google Chat bot deployed on Cloud Run, answering with Vertex AI and retrieval-augmented generation over historical conversations.",
    stack: "Python · Vertex AI · RAG · Cloud Run",
  },
  {
    ctx: "Freelance · AI voice agent",
    title: "Voice-agent booking API",
    body: "REST API used by an ElevenLabs voice agent via Twilio for authentication, OTP verification and appointment booking during live calls, with Stripe payments.",
    stack: "Laravel · Twilio · ElevenLabs · Stripe",
  },
  {
    ctx: "Callbox · Automation",
    title: "AI voice campaigns",
    body: "VAPI AI voice agents for webinar invitations and reminders, supporting 300+ outbound calls per campaign.",
    stack: "VAPI AI · Webhooks",
  },
  {
    ctx: "Callbox · Automation",
    title: "Document provisioning",
    body: "n8n workflows that grant, revoke and reassign role-based documents across employee lifecycle events, integrating Google Drive, SFTP and email.",
    stack: "n8n · Google Drive · SFTP",
    slug: "secure-file-transfer",
  },
  {
    ctx: "Live private beta · Solo build",
    title: "SecondTrip",
    body: "Multi-tenant callback review with validated CSV imports, explainable scoring, PostgreSQL row-level security and an append-only decision history.",
    stack: "FastAPI · PostgreSQL · Next.js · R2",
    slug: "secondtrip",
  },
];

const cardClass =
  "h-full rounded-xl border border-brand-border bg-brand-surface p-7 flex flex-col gap-3 text-brand-text";

const CardBody = ({ item }) => (
  <>
    <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-brand-gold">{item.ctx}</span>
    <strong className="text-[21px] font-bold tracking-tight">{item.title}</strong>
    <p className="text-[15px] leading-relaxed text-brand-muted">{item.body}</p>
    <span className="mt-auto pt-3 border-t border-brand-border font-mono text-xs text-brand-muted">
      {item.stack}
    </span>
  </>
);

const SelectedWork = () => (
  <section id="work" className="border-t border-brand-border bg-brand-surface/40">
    <div className="page-shell">
      <div className="mx-auto max-w-6xl py-20 md:py-24">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="text-[clamp(1.7rem,3vw,2.25rem)] font-bold tracking-[-0.02em] text-brand-text">
            AI, automation &amp; systems I&apos;ve shipped
          </h2>
          <Link to="/projects" className="font-medium text-brand-gold hover:underline underline-offset-4">
            All projects →
          </Link>
        </div>
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {work.map((item) => (
            <li key={item.title}>
              {item.slug ? (
                <Link
                  to={`/projects/${item.slug}`}
                  className={`${cardClass} transition-colors hover:border-brand-gold/60`}
                >
                  <CardBody item={item} />
                </Link>
              ) : (
                <div className={cardClass}>
                  <CardBody item={item} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default SelectedWork;
