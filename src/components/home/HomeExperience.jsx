const jobs = [
  {
    when: "06/2025 – present",
    role: "Freelance Software Developer",
    org: "Philippines",
    what: "REST API used by an ElevenLabs AI voice agent via Twilio for authentication, OTP verification and live-call booking; a cross-platform Flutter app for AI-assisted scheduling; API architecture, data models and Stripe payments.",
  },
  {
    when: "10/2025 – 07/2026",
    role: "Junior Software Developer",
    org: "Callbox Inc.",
    what: "Shipped a RAG Google Chat bot on Cloud Run with Vertex AI, VAPI voice agents handling 300+ outbound calls per campaign, n8n document-provisioning workflows, and HubSpot CRM integrations with the company's pipeline database.",
  },
  {
    when: "02/2025 – 05/2025",
    role: "Software Development Intern",
    org: "Callbox Inc.",
    what: "Laravel and MySQL application work: performance optimization, debugging and frontend/backend integration.",
  },
];

const education = [
  { when: "2021 – 2025", what: "BS Computer Science", where: "Central Philippine University" },
  { when: "2019 – 2021", what: "Vocational Degree in Computer Technology", where: "Professional Electronics Institute Inc." },
];

const stack = [
  { group: "AI & Agents", items: "Claude Agent SDK, MCP servers, Vertex AI, RAG, LLM integrations, AI agents" },
  { group: "Automation & Integrations", items: "n8n, VAPI AI, ElevenLabs, Twilio, HubSpot CRM, Stripe, Google Drive, SFTP" },
  { group: "Backend & Data", items: "Python, PHP, TypeScript, FastAPI, Laravel, SQLAlchemy, PostgreSQL, MySQL, Supabase" },
  { group: "Frontend & Mobile", items: "React, Next.js, Flutter, Tailwind CSS" },
  { group: "Cloud & Tools", items: "Google Cloud Run, Cloudflare Workers & R2, Docker, Render, Vercel, Linux, Git" },
];

const HomeExperience = () => (
  <section id="experience" className="page-shell">
    <div className="mx-auto max-w-6xl pt-20 md:pt-24 pb-20">
      <h2 className="mb-8 text-[clamp(1.7rem,3vw,2.25rem)] font-bold tracking-[-0.02em] text-brand-text">
        Experience
      </h2>
      <ol>
        {jobs.map((j) => (
          <li key={j.when + j.role} className="flex flex-col md:flex-row gap-2 md:gap-10 py-7 border-t border-brand-border">
            <span className="md:w-44 shrink-0 pt-0.5 font-mono text-[13px] text-brand-muted">{j.when}</span>
            <div className="min-w-0 flex flex-col gap-1.5">
              <strong className="text-lg font-semibold text-brand-text">
                {j.role} <span className="font-normal text-brand-muted">· {j.org}</span>
              </strong>
              <p className="text-[15px] leading-relaxed text-brand-text/80 max-w-[72ch]">{j.what}</p>
            </div>
          </li>
        ))}
      </ol>

      <h3 className="mt-12 mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-brand-gold">Education</h3>
      <ul>
        {education.map((e) => (
          <li key={e.what} className="flex flex-col md:flex-row gap-1 md:gap-10 py-4 border-t border-brand-border">
            <span className="md:w-44 shrink-0 font-mono text-[13px] text-brand-muted">{e.when}</span>
            <span className="text-[15px] text-brand-text">
              {e.what} <span className="text-brand-muted">· {e.where}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-12 rounded-xl border border-brand-border grid sm:grid-cols-2 lg:grid-cols-3 overflow-hidden">
        {stack.map((s) => (
          <div key={s.group} className="p-6 flex flex-col gap-2.5 border-b sm:border-r border-brand-border -mb-px -mr-px">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-brand-gold">{s.group}</span>
            <span className="text-[15px] leading-7 text-brand-text/80">{s.items}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HomeExperience;
