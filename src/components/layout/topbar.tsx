"use client";
import { NavMobile } from "./nav-mobile";
import { NavDesktop } from "./nav-desktop";
import { ModeToggle } from "./ModeToggle";
import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import AIChatButton from "../ai/AIChatButton";
import { Separator } from "../ui/separator";

export const Topbar = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div
      className={`container px-8 mx-auto justify-center items-center ${
        isOpen ? "fixed top-0 z-50" : ""
      } bg-background`}
    >
      <nav className="flex items-start justify-between py-4">
        <NavMobile isOpen={isOpen} setOpen={setOpen} />
        <NavDesktop />
        <div className="justify-center items-center flex space-x-2">
          <AIChatButton />
          <ModeToggle />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" asChild>
                  <Link href="/">MM</Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="flex space-x-1">
                  Home
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.2rem"
                    height="1.2rem"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    >
                      <path
                        strokeDasharray={21}
                        strokeDashoffset={21}
                        d="M5 21H19"
                      >
                        <animate
                          fill="freeze"
                          attributeName="stroke-dashoffset"
                          dur="0.2s"
                          values="21;0"
                        ></animate>
                      </path>
                      <path
                        strokeDasharray={15}
                        strokeDashoffset={15}
                        d="M5 21V8M19 21V8"
                      >
                        <animate
                          fill="freeze"
                          attributeName="stroke-dashoffset"
                          begin="0.2s"
                          dur="0.2s"
                          values="15;0"
                        ></animate>
                      </path>
                      <path
                        strokeDasharray={24}
                        strokeDashoffset={24}
                        d="M9 21V13H15V21"
                      >
                        <animate
                          fill="freeze"
                          attributeName="stroke-dashoffset"
                          begin="0.4s"
                          dur="0.4s"
                          values="24;0"
                        ></animate>
                      </path>
                      <path
                        strokeDasharray={26}
                        strokeDashoffset={26}
                        d="M2 10L12 2L22 10"
                      >
                        <animate
                          fill="freeze"
                          attributeName="stroke-dashoffset"
                          begin="0.5s"
                          dur="0.4s"
                          values="26;0"
                        ></animate>
                      </path>
                    </g>
                  </svg>
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </nav>
      <Separator />
    </div>
  );
};
