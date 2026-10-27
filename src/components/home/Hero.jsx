import BrandLockup from "../BrandLockup";
import LightSwitch from "../LightSwitch";

const CV_HREF = "/Jaylord Vhan Fabor - Resume.pdf";

const navLinks = [
  { href: "#case", label: "Case study" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

// The profile card is styled as an API response. It stays dark in both themes
// on purpose (it reads as a code block), so its colors are fixed, not tokens.
const Key = ({ children }) => <span className="text-[#EABE55]">&quot;{children}&quot;</span>;
const Str = ({ children }) => <span className="text-[#7DD3FC]">&quot;{children}&quot;</span>;
const List = ({ items }) => (
  <>
    [
    {items.map((item, i) => (
      <span key={item}>
        <Str>{item}</Str>
        {i < items.length - 1 ? ", " : ""}
      </span>
    ))}
    ]
  </>
);

const ProfileResponse = () => (
  <div className="min-w-0 rounded-xl border border-[#252836] bg-[#161922] overflow-hidden shadow-[0_24px_60px_rgb(0_0_0/0.25)]">
    <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-[#252836] font-mono text-xs">
      <span>
        <span className="text-[#4ADE80]">GET</span>{" "}
        <span className="text-[#CBD5E1]">/v1/me</span>
      </span>
      <span className="text-[#4ADE80]">200 OK</span>
    </div>
    <pre className="m-0 p-5 font-mono text-[12px] sm:text-[13px] leading-7 text-[#CBD5E1] whitespace-pre overflow-x-auto">
      {"{\n  "}<Key>name</Key>: <Str>Jaylord Vhan Fabor</Str>,
      {"\n  "}<Key>role</Key>: <Str>Software Engineer</Str>,
      {"\n  "}<Key>focus</Key>: <List items={["AI agents", "Automation", "Backends"]} />,
      {"\n  "}<Key>ai</Key>: <List items={["Claude Agent SDK", "MCP", "RAG"]} />,
      {"\n  "}<Key>automation</Key>: <List items={["n8n", "VAPI AI", "ElevenLabs"]} />,
      {"\n  "}<Key>backend</Key>: <List items={["Laravel", "Python", "TypeScript"]} />,
      {"\n  "}<Key>data</Key>: <List items={["PostgreSQL", "MySQL"]} />,
      {"\n  "}<Key>open_to_remote</Key>: <span className="text-[#FCA5A5]">true</span>
      {"\n}"}
    </pre>
  </div>
);

const Hero = ({ onOpenContact = () => {} }) => (
  <section id="top" className="bg-brand-bg">
    <header className="border-b border-brand-border">
      <div className="page-shell py-4 flex items-center justify-between gap-4">
        <BrandLockup />
        <div className="flex items-center gap-8">
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex flex-wrap gap-7 text-[15px]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-brand-muted hover:text-brand-text transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <LightSwitch />
        </div>
      </div>
    </header>

    <div className="page-shell">
      <div className="mx-auto max-w-6xl py-16 md:py-24 grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-center">
        <div className="min-w-0">
          <div className="mb-8 flex items-center gap-4">
            <img
              src="/logo/profile.jpg"
              alt="Jaylord Vhan Fabor"
              width="72"
              height="72"
              className="h-16 w-16 sm:h-[72px] sm:w-[72px] shrink-0 rounded-full object-cover border-2 border-brand-gold/60"
            />
            <div className="min-w-0">
              <p className="text-lg font-semibold text-brand-text">Jaylord Vhan Fabor</p>
              <p className="mt-0.5 font-mono text-[13px] tracking-[0.04em] text-brand-muted">
                <span className="text-brand-gold">$</span> software engineer · AI engineering &amp; automation
              </p>
            </div>
          </div>
          <h1 className="text-[clamp(2.4rem,5.2vw,4.25rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-brand-text max-w-[17ch]">
            I build AI agents and automation on <span className="text-brand-gold">reliable</span> backends.
          </h1>
          <p className="mt-4 font-mono text-[13px] text-brand-muted">Iloilo City, PH · open to remote roles; willing to relocate</p>
          <p className="mt-6 text-lg leading-relaxed text-brand-text/80 max-w-[58ch]">
            LLM-powered tools and workflow automation with the Claude Agent SDK, MCP, Vertex AI and n8n,
            on Laravel, Python, TypeScript and PostgreSQL. I ship AI services to production and wire AI into
            CRM, booking and internal workflows.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex items-center min-h-12 px-6 rounded-lg bg-brand-gold text-brand-bg font-semibold hover:bg-brand-gold/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg"
            >
              Get in touch
            </button>
            <a
              href={CV_HREF}
              download="Jaylord-Vhan-Fabor-CV.pdf"
              className="inline-flex items-center min-h-12 px-6 rounded-lg border border-brand-border text-brand-text font-medium hover:border-brand-gold/60 transition-colors"
            >
              Download CV
            </a>
            <a
              href="https://github.com/JjayFabor"
              target="_blank"
              rel="me noopener noreferrer"
              className="inline-flex items-center min-h-12 px-4 rounded-lg text-brand-muted font-medium hover:text-brand-text transition-colors"
            >
              GitHub →
            </a>
          </div>
        </div>
        <ProfileResponse />
      </div>
    </div>
  </section>
);

export default Hero;
