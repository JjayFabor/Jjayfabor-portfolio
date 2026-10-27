import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Clock3, ExternalLink, Github } from "lucide-react";
import { getProjectBySlug } from "../data/projects";
import Footer from "../components/Footer";
import LightSwitch from "../components/LightSwitch";
import BrandLockup from "../components/BrandLockup";
import ScreenshotCarousel from "../components/ScreenshotCarousel";

const slugify = (s) =>
  String(s)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Flatten React children back to plain text (for deriving a heading's anchor id).
const nodeText = (node) => {
  if (node == null) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (typeof node === "object" && node.props) return nodeText(node.props.children);
  return "";
};

// Brand-styled renderers for the Markdown case-study body (no typography plugin).
// H2s get an anchor id + scroll offset so the sticky jump-nav can target them.
const markdownComponents = {
  h2: ({ children, ...props }) => (
    <h2
      id={slugify(nodeText(children))}
      className="scroll-mt-24 text-xl font-semibold text-brand-text mt-8 mb-3"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: (props) => (
    <h3 className="text-lg font-semibold text-brand-text mt-6 mb-2" {...props} />
  ),
  p: (props) => (
    <p className="text-brand-muted leading-relaxed mb-4" {...props} />
  ),
  ul: (props) => (
    <ul className="list-disc pl-5 space-y-1.5 text-brand-muted mb-4" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal pl-5 space-y-1.5 text-brand-muted mb-4" {...props} />
  ),
  a: (props) => (
    <a
      className="text-brand-accent hover:text-brand-accent-hover underline"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="font-mono text-sm bg-brand-accent/10 text-brand-accent px-1.5 py-0.5 rounded"
      {...props}
    />
  ),
  strong: (props) => (
    <strong className="text-brand-text font-semibold" {...props} />
  ),
};

const formatDate = (d) => {
  if (!d) return null;
  const parsed = new Date(`${d}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

// The opt-in sections a project declares are just its `## ` headings — the
// jump-nav is derived from them, never authored separately, so it can't drift.
const sectionsFromBody = (body) => {
  const sections = [];
  const re = /^##\s+(.+)$/gm;
  let m;
  while ((m = re.exec(body))) {
    const label = m[1].replace(/[*_`]/g, "").trim();
    if (label) sections.push({ id: slugify(label), label });
  }
  return sections;
};

// Shared page shell: home-linking header with theme toggle, footer.
const Shell = ({ children }) => (
  <div className="min-h-screen bg-brand-bg flex flex-col">
    <header className="bg-brand-bg border-b border-brand-border">
      <div className="page-shell py-5 flex items-center justify-between gap-4">
        <Link
          to="/"
          aria-label="Back to home"
          className="group inline-flex items-center text-brand-text"
        >
          <BrandLockup />
        </Link>
        <LightSwitch />
      </div>
    </header>
    <main className="page-shell py-8 md:py-10 flex-grow">
      {children}
    </main>
    <Footer />
  </div>
);

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  useEffect(() => {
    const prev = document.title;
    document.title = project
      ? `${project.title} — Jjay Fabor`
      : "Project not found — Jjay Fabor";
    return () => {
      document.title = prev;
    };
  }, [project]);

  // Honor a deep link like /projects/delphi#architecture on load (after the
  // route-change ScrollToTop has run — hence the rAF).
  useEffect(() => {
    if (!project || !window.location.hash) return;
    const id = decodeURIComponent(window.location.hash.slice(1));
    const raf = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    });
    return () => cancelAnimationFrame(raf);
  }, [project]);

  if (!project) {
    return (
      <Shell>
        <div className="text-center py-16">
          <p className="text-brand-text/85 font-medium">
            That project doesn&rsquo;t exist.
          </p>
          <Link
            to="/projects"
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium bg-brand-accent text-brand-bg hover:bg-brand-accent-hover transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>
        </div>
      </Shell>
    );
  }

  const isCompleted = project.status === "completed";
  const formattedDate = formatDate(project.date);
  // Strip authoring TODO comments; render the rest as the case-study body.
  const body = (project.body || "").replace(/<!--[\s\S]*?-->/g, "").trim();

  // Every image a project has — its main `image` plus any extra `screenshots` —
  // shown together in one carousel (main image first, de-duplicated).
  const galleryImages = [
    ...(project.image ? [project.image] : []),
    ...(Array.isArray(project.screenshots) ? project.screenshots : []),
  ].filter((src, i, arr) => arr.indexOf(src) === i);
  const hasGallery = galleryImages.length > 0;
  // Gallery leads the page, so it leads the jump-nav too — the nav order has to
  // match the document order or the links read as out of sequence.
  const sections = hasGallery
    ? [{ id: "gallery", label: "Gallery" }, ...sectionsFromBody(body)]
    : sectionsFromBody(body);
  // A jump-nav only earns its place once there are a couple of sections.
  const showNav = sections.length >= 2;

  const handleJump = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <Shell>
      {/* Back to the list */}
      <Link
        to="/projects"
        className="group inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent hover:text-brand-accent-hover"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Back to projects
      </Link>

      {/* Title + meta */}
      <div className="mt-5 max-w-4xl">
        {project.contextLabel && (
          <p className="mb-2 font-mono text-xs font-medium uppercase tracking-[0.14em] text-brand-accent">
            {project.contextLabel}
          </p>
        )}
        <h1 className="text-2xl md:text-3xl font-bold text-brand-text">
          {project.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-brand-muted">
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              isCompleted
                ? "bg-brand-accent/90 text-brand-bg"
                : "bg-brand-bg text-brand-accent border border-brand-accent/50"
            }`}
          >
            {isCompleted ? "Completed" : "Ongoing"}
          </span>
          <span>{project.category}</span>
          {formattedDate && (
            <>
              <span aria-hidden="true">&middot;</span>
              <span>{formattedDate}</span>
            </>
          )}
        </div>
      </div>

      {/* Tech stack — full list */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.techStack.map((tech, index) => (
          <span
            key={index}
            className="bg-brand-accent/10 text-brand-text font-mono text-[11px] px-2 py-0.5 rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Actions — moved here from the card */}
      <div className="mt-5 flex flex-wrap gap-2">
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-md text-sm font-medium bg-brand-accent text-brand-bg hover:bg-brand-accent-hover transition-colors"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        )}
        {project.preview && (
          <a
            href={project.preview}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-md text-sm font-medium border border-brand-accent/50 text-brand-accent hover:bg-brand-accent/10 hover:text-brand-accent-hover transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            Live Preview
          </a>
        )}
        {!project.link && !project.preview && (
          <span className="inline-flex items-center gap-2 h-10 px-4 rounded-md text-sm font-medium border border-dashed border-brand-border text-brand-muted">
            <Clock3 className="h-4 w-4" aria-hidden="true" />
            Source repository coming soon
          </span>
        )}
      </div>

      {/* Sticky jump-nav — derived from the body's H2 sections (+ Gallery) */}
      {showNav && (
        <nav
          aria-label="On this page"
          className="page-shell-bleed sticky top-0 z-10 mt-8 py-3 bg-brand-bg/90 backdrop-blur border-b border-brand-border"
        >
          <ul className="flex flex-wrap gap-2">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => handleJump(e, s.id)}
                  className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-brand-surface text-brand-text border border-brand-border hover:border-brand-accent/60 hover:text-brand-accent transition-colors"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Gallery — opt-in, from the `screenshots` frontmatter array. Sits above the
          write-up so the first thing on the page is what the project looks like,
          rather than several paragraphs before any visual. */}
      {hasGallery && (
        <section id="gallery" className="scroll-mt-24 mt-8 max-w-6xl">
          <h2 className="text-xl font-semibold text-brand-text mb-4">Gallery</h2>
          <ScreenshotCarousel images={galleryImages} title={project.title} />
        </section>
      )}

      {/* Case-study body */}
      {body && (
        <div className={`max-w-prose ${hasGallery ? "mt-10" : "mt-8"}`}>
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {body}
          </ReactMarkdown>
        </div>
      )}
    </Shell>
  );
};

export default ProjectDetailPage;
