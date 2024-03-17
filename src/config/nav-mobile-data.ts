import { GitHubIcon } from "@/components/icons";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  label?: string;
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
    },
    {
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/marc-mansour-1b938496/",
    },
    {
      title: "X/Twitter",
      href: "https://twitter.com/Marc87240",
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
      title: "Blog",
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
