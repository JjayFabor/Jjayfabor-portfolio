import { VscGithub, VscMail } from "react-icons/vsc";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { CircleHelp, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import Monogram from "./Monogram";
import { useContact } from "../context/ContactContext";
import { activeProfiles } from "../data/profiles";

const profileHref = (label) =>
  activeProfiles.find((p) => p.label === label)?.href;

const linkClass =
  "inline-flex items-center gap-2 h-11 px-4 rounded-md text-sm font-medium text-brand-accent hover:bg-brand-accent/10 hover:text-brand-accent-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface";

const socialLinks = [
  {
    icon: <CircleHelp className="h-5 w-5" />,
    label: "FAQ",
    to: "/faq",
  },
  {
    icon: <VscGithub className="h-5 w-5" />,
    label: "GitHub",
    href: "https://github.com/JjayFabor",
    rel: "me noopener noreferrer",
  },
  {
    icon: <FaLinkedin className="h-5 w-5" />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jjayfabor/",
    rel: "me noopener noreferrer",
  },
  {
    icon: <Briefcase className="h-5 w-5" />,
    label: "OnlineJobs.ph",
    href: profileHref("OnlineJobs.ph"),
    rel: "me noopener noreferrer",
  },
  {
    icon: <FaInstagram className="h-5 w-5" />,
    label: "Instagram",
    href: profileHref("Instagram"),
    rel: "me noopener noreferrer",
  },
  {
    // Opens the in-page contact form. A mailto: link silently does nothing when
    // the visitor has no default mail app (e.g. webmail users), so we trigger
    // the shared Contact modal instead.
    icon: <VscMail className="h-5 w-5" />,
    label: "Email",
    action: "contact",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();
  const { openContact } = useContact();

  return (
    <footer className="bg-brand-surface border-t border-brand-border">
      <div className="page-shell py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Monogram className="w-8 h-8 rounded-lg text-lg" />
            <p className="text-sm text-brand-muted text-center sm:text-left">
              &copy; {year} Jaylord Vhan Fabor
            </p>
          </div>

          <nav aria-label="Footer links">
            <ul className="flex flex-wrap items-center justify-center gap-2">
              {socialLinks
                .filter((link) => link.to || link.href || link.action)
                .map((link) => (
                <li key={link.label}>
                  {link.to ? (
                    <Link to={link.to} className={linkClass}>
                      {link.icon}
                      {link.label}
                    </Link>
                  ) : link.href ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel={link.rel}
                      className={linkClass}
                    >
                      {link.icon}
                      {link.label}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={openContact}
                      className={linkClass}
                    >
                      {link.icon}
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
