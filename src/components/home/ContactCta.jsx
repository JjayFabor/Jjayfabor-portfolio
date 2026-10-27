import { profiles } from "../../data/profiles";

const ContactCta = ({ onOpenContact = () => {} }) => {
  const links = profiles.filter((p) => p.href);

  return (
    <section id="contact" className="border-t border-brand-border">
      <div className="page-shell">
        <div className="mx-auto max-w-6xl py-20 md:py-28">
          <div className="flex flex-wrap items-center justify-between gap-10">
            <div className="min-w-0 flex-1 basis-[32rem]">
              <h2 className="text-[clamp(2rem,4.4vw,3.4rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-brand-text max-w-[18ch]">
                Need AI and automation that hold up in production?
              </h2>
              <p className="mt-4 text-[17px] text-brand-muted">
                Open to remote roles and freelance work. Willing to relocate.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onOpenContact}
                className="inline-flex items-center min-h-[52px] px-7 rounded-lg bg-brand-gold text-brand-bg text-[17px] font-semibold hover:bg-brand-gold/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg"
              >
                Get in touch
              </button>
              <a
                href="/Jaylord Vhan Fabor - Resume.pdf"
                download="Jaylord-Vhan-Fabor-CV.pdf"
                className="inline-flex items-center min-h-[52px] px-7 rounded-lg border border-brand-border text-brand-text text-[17px] font-medium hover:border-brand-gold/60 transition-colors"
              >
                Download CV
              </a>
            </div>
          </div>

          {links.length > 0 && (
            <nav aria-label="Profiles" className="mt-12">
              <ul className="grid grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] rounded-xl border border-brand-border overflow-hidden">
                {links.map((p) => (
                  <li key={p.label} className="border-b sm:border-r border-brand-border -mb-px -mr-px">
                    <a
                      href={p.href}
                      target="_blank"
                      rel="me noopener noreferrer"
                      className="flex flex-col gap-1.5 px-6 py-5 hover:bg-brand-surface transition-colors"
                    >
                      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-brand-gold">
                        {p.label} ↗
                      </span>
                      <span className="text-[15px] text-brand-text/80">{p.handle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactCta;
