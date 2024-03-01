"use client";

import { useClickAway } from "react-use";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Squash as Hamburger } from "hamburger-react";
import { routes } from "./routes";
import Link from "next/link";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export const NavMobile = ({ isOpen, setOpen }: any) => {
  const ref = useRef(null);

  useClickAway(ref, () => setOpen(false));

  return (
    <div ref={ref} className="md:hidden z-50">
      <Hamburger toggled={isOpen} size={20} toggle={setOpen} />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 shadow-4xl right-0  p-5 bg-background"
          >
            <Separator />
            <div className="grid">
              {routes.map((route, idx) => {
                const { Icon } = route;

                return (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1 + idx / 10,
                    }}
                    key={route.title}
                    className="w-full rounded-xl"
                  >
                    <Link
                      onClick={() => setOpen((prev: any) => !prev)}
                      className={
                        "flex p-3 rounded-xl items-center justify-center"
                      }
                      href={route.href}
                    >
                      <Button variant="ghost" className="w-full">
                        <span className="flex items-center text-lg">
                          {route.title}
                        </span>
                        <div className="flex justify-between pl-5">
                          <Icon className="text-xl" />
                        </div>
                      </Button>
                    </Link>
                    <Separator />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
