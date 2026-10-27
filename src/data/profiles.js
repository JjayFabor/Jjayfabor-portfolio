// Public profile links, shared by the home Contact section and the Footer.
// An entry with an empty `href` is hidden everywhere until it is filled in.
export const profiles = [
  {
    label: "LinkedIn",
    handle: "in/jjayfabor",
    href: "https://www.linkedin.com/in/jjayfabor/",
  },
  {
    label: "GitHub",
    handle: "JjayFabor",
    href: "https://github.com/JjayFabor",
  },
  {
    label: "OnlineJobs.ph",
    handle: "Hire me directly",
    href: "https://v2.onlinejobs.ph/jobseekers/info/1555008",
  },
  {
    label: "Instagram",
    handle: "@jjayfabor",
    href: "https://www.instagram.com/jjayfabor",
  },
];

export const activeProfiles = profiles.filter((p) => p.href);
