import Link from "next/link";
import { Button } from "../ui/button";
import { routes } from "./routes";

export const NavDesktop = () => {
  return (
    <div className="hidden md:flex md:items-center text-sm">
      {routes.map((route, key) => {
        const { Icon, href, title } = route;
        return (
          <Link href={href} key={title}>
            <Button variant="ghost">
              <Icon />

              {title}
            </Button>
          </Link>
        );
      })}
    </div>
  );
};
