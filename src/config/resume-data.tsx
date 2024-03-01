import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";

export const RESUME_DATA = {
  name: "Marc Mansour",
  initials: "MM",
  location: "Paris, France, CET",
  locationLink: "https://www.google.com/maps/place/Paris",
  about:
    "Project Manager aspiring to contribute positively to developing a more meaningful world through innovative technology.",
  summary:
    "Embarking on a new chapter as a project manager in finance, I am eagerly transitioning into the world of coding. Fueled by a deep passion for technology, I've enrolled in coding bootcamps and online courses to acquire the necessary skills. My vision is to merge my financial expertise with coding, creating innovative solutions and contributing actively to development projects.",
  avatarUrl:
    "https://avatars.githubusercontent.com/u/139041349?s=400&u=78fc2e2aa1d2b96e28b59310a647fa987b768f54&v=4",
  personalWebsiteUrl: "/",
  contact: {
    email: "marcm9387@gmail.com",
    tel: "+33688141676",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/marcm8793",
        icon: GitHubIcon,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/marc-mansour-1b938496/",
        icon: LinkedInIcon,
      },
      {
        name: "X",
        url: "https://twitter.com/Marc87240",
        icon: XIcon,
      },
    ],
  },
  education: [
    {
      school: "Université de Limoges",
      degree: "Master 2 (M2) Banques, Risques et Marchés",
      start: "2015",
      end: "2016",
    },
    {
      school: "University of Birmingham",
      degree: "Master 1 Msc Money, Banking and Finance",
      start: "2014",
      end: "2015",
    },
  ],
  work: [
    {
      company: "Societe Generale CIB",
      link: "https://wholesale.banking.societegenerale.com/en/",
      badges: ["Finance"],
      title: "Expert / Project manager",
      start: "2023",
      end: "2024",
      description:
        "Business improvements between trading and Middle-office teams. Process convergence.",
    },
    {
      company: "Crédit Agricole CIB",
      link: "https://www.ca-cib.fr/",
      badges: ["Finance"],
      title: "Head of Equity Collateral & Settlement",
      start: "2016",
      end: "2023",
      description:
        "Management of stock lending and collateral operations on SFCM. Settlement of cash equity trades. Management of a team of 10 people.",
    },
    {
      company: "BNP Paribas Securities Services",
      link: "https://securities.cib.bnpparibas/",
      badges: ["Finance"],
      title: "Securities account manager",
      start: "2016",
      end: "2016",
      description:
        "Managed securities accounts for institutional clients. Created and maintained reports for clients and internal use.",
    },
  ],
  skills: ["JavaScript", "TypeScript", "React/Next.js", "Node.js"],
  projects: [
    {
      title: "NextApps",
      techStack: [
        "Side Project",
        "TypeScript",
        "Next.js",
        "Vite",
        "Prisma",
        "Zod",
      ],
      description: "Your productivity dashboard",
      link: {
        label: "nextapps.dev",
        href: "https://www.nextapps.dev/",
      },
    },
    {
      title: "MemoStash",
      techStack: ["Side Project", "TypeScript", "Next.js", "Zustand"],
      description:
        "All-in-one workspace that combines note-taking & project management into a single, customizable platform.",
      link: {
        label: "memostash-lp.vercel.app",
        href: "https://memostash-lp.vercel.app/",
      },
    },
    {
      title: "Code Space",
      techStack: [
        "Side Project",
        "Next.js",
        "OpenAI",
        "TailwindCSS",
        "Vercel",
        "MongoDB",
      ],
      description:
        "Coding collaboration platform with AI-powered code answers.",
      link: {
        label: "codespace.forum",
        href: "hhttps://www.codespace.forum/",
      },
    },
  ],
} as const;
