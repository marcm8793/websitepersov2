import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  label?: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface MainNavItem extends NavItem {}

export interface SidebarNavItem extends NavItemWithChildren {}

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "GitHub",
      href: "https://github.com/marcm8793",
      icon: GitHubIcon,
    },
    {
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/marc-mansour2142/",
      icon: LinkedInIcon,
    },
    {
      title: "Twitter",
      href: "https://twitter.com/Marc87240",
      icon: XIcon,
    },
    {
      title: "Projects",
      href: "/projects",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Resume",
      href: "/cv",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ],
  sidebarNav: [
    {
      title: "Blog ▾",
      items: [
        {
          title: "Articles",
          href: "/blog",
          items: [],
        },
        {
          title: "Reading List",
          href: "/readinglist",
          items: [],
        },
      ],
    },
  ],
};
