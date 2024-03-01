import {
  Home,
  FolderKanban,
  Book,
  BadgeInfo,
  FolderCheck,
  Contact,
} from "lucide-react";

export const routes = [
  {
    title: "Home",
    href: "/",
    Icon: Home,
  },
  {
    title: "Projects",
    href: "/projects",
    Icon: FolderKanban,
  },
  {
    title: "Blog",
    href: "/blog",
    Icon: Book,
  },
  {
    title: "About",
    href: "/about",
    Icon: BadgeInfo,
  },
  {
    title: "Resume",
    href: "/cv",
    Icon: FolderCheck,
  },
  {
    title: "Contact",
    href: "/contact",
    Icon: Contact,
  },
];
