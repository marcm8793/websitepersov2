"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { routes } from "./routes";
import { Book } from "lucide-react";
import { createElement, forwardRef } from "react";

export function NavDesktop() {
  return (
    <div className="hidden md:flex md:items-center text-sm">
      <NavigationMenu>
        <NavigationMenuList>
          {" "}
          {routes.map((route, index) => (
            <NavigationMenuItem key={index}>
              <NavigationMenuLink asChild>
                <Link href={route.href} className={navigationMenuTriggerStyle()}>
                  {createElement(route.Icon)}
                  {route.title}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              {" "}
              <Book />
              Blog
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[200px] lg:w-[400px] lg:grid-cols-[1fr 1fr]">
                <ListItem href="/blog" title="Articles">
                  A list of articles on webdev, programming and investing.
                </ListItem>
                <ListItem href="/readinglist" title="Reading List">
                  Some books to read that I recommend.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, href, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={String(href)}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
