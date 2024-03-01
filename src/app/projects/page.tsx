import React from "react";
import Image from "next/image";
import Link from "next/link";

import { ArrowUpRightSquare, Github } from "lucide-react";
import { TbBrandNextjs } from "react-icons/tb";
import { RiOpenaiFill } from "react-icons/ri";
import {
  SiTailwindcss,
  SiZod,
  SiPrisma,
  SiRadixui,
  SiMongoose,
} from "react-icons/si";
import {
  BiLogoMongodb,
  BiLogoTypescript,
  BiLogoPostgresql,
} from "react-icons/bi";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const projects = [
  {
    name: "Code Space",
    description: "Coding collaboration platform with AI-powered code answers.",
    image: "/CodeSpace.png",
    github: "https://github.com/marcm8793/devflow",
    link: "https://www.codespace.forum/",
    tools: [
      { icon: <BiLogoTypescript />, tooltip: "TypeScript" },
      { icon: <TbBrandNextjs />, tooltip: "Next.js" },
      { icon: <SiTailwindcss />, tooltip: "Tailwind CSS" },
      { icon: <RiOpenaiFill />, tooltip: "OpenAI" },
      { icon: <SiZod />, tooltip: "Zod" },
      { icon: <BiLogoMongodb />, tooltip: "MongoDB" },
      { icon: <SiMongoose />, tooltip: "Mongoose" },
    ],
  },
  {
    name: "MemoStash",
    description:
      "All-in-one workspace that combines note-taking & project management into a single, customizable platform.",
    image: "/memostash.png",
    github: "https://github.com/marcm8793/NotionLP",
    link: "https://memostash-lp.vercel.app/",
    tools: [
      { icon: <BiLogoTypescript />, tooltip: "TypeScript" },
      { icon: <TbBrandNextjs />, tooltip: "Next.js" },
      { icon: <SiTailwindcss />, tooltip: "Tailwind CSS" },
      { icon: "🐻", tooltip: "Zustand" },
    ],
  },
  {
    name: "NextApps",
    description: "Your productivity dashboard.",
    image: "/nextapps4.png",
    github: "https://github.com/marcm8793/todonextprod",
    link: "https://www.nextapps.dev/",
    tools: [
      { icon: <BiLogoTypescript />, tooltip: "TypeScript" },
      { icon: <TbBrandNextjs />, tooltip: "Next.js" },
      { icon: <SiTailwindcss />, tooltip: "Tailwind CSS" },
      { icon: <SiPrisma />, tooltip: "Prisma" },
      { icon: <SiRadixui />, tooltip: "Radix/ShadcnUI" },
      { icon: <SiZod />, tooltip: "Zod" },
      { icon: <BiLogoPostgresql />, tooltip: "Postgresql" },
    ],
  },
  {
    name: "Personnal Website",
    description: "My projects and journey as a developper.",
    image: "/portfolio2.png",
    github: "https://github.com/marcm8793/resumeprod",
    link: "/",
    tools: [
      { icon: <BiLogoTypescript />, tooltip: "TypeScript" },
      { icon: <TbBrandNextjs />, tooltip: "Next.js" },
      { icon: <SiTailwindcss />, tooltip: "Tailwind CSS" },
      { icon: <SiPrisma />, tooltip: "Prisma" },
      { icon: <SiRadixui />, tooltip: "Radix/ShadcnUI" },
      { icon: <SiZod />, tooltip: "Zod" },
      { icon: <BiLogoPostgresql />, tooltip: "Postgresql" },
    ],
  },
];

const page = () => {
  return (
    <div className="container">
      <h1 className="my-10 text-center font-bold text-4xl">
        Projects
        <hr className="w-6 h-1 mx-auto my-4 bg-teal-500 border-0 rounded"></hr>
      </h1>

      <div className="flex flex-col space-y-28">
        {projects.map((project, idx) => {
          return (
            <div key={idx}>
              <div className="flex flex-col  animate-slideUpCubiBezier animation-delay-2 md:flex-row md:space-x-12">
                <div className=" md:w-1/2">
                  <Link href={project.link} target="_blank">
                    <Image
                      src={project.image}
                      alt="Project Image"
                      width={500}
                      height={300}
                      className="rounded-xl shadow-xl hover:opacity-70 border"
                    />
                  </Link>
                </div>
                <div className="mt-8 md:w-1/2">
                  <Link href={project.link} target="_blank">
                    <h1
                      className="text-4xl font-bold mb-6 cursor-pointer relative
                    inline-block
                transition-all
                duration-500
                before:content-['']
                before:absolute
                before:-bottom-2
                before:left-0
                before:w-0
                before:h-1.5
                before:rounded-full
                before:opacity-0
                before:transition-all
                before:duration-500
                before:bg-gradient-to-r
                before:from-gray-600
                before:via-slate-400
                before:to-zinc-500
                hover:before:w-full
                hover:before:opacity-100"
                    >
                      {project.name}
                    </h1>
                  </Link>
                  <p className="text-xl leading-7 mb-4 text-neutral-600 dark:text-neutral-400">
                    {project.description}
                  </p>

                  {/* List of tools */}
                  <div className="flex flex-row align-bottom text-2xl space-x-2 items-center">
                    <p className="text-sm">Made with: &nbsp;</p>
                    {project.tools?.map((tool, toolIdx) => (
                      <div key={toolIdx} className="space-x-4 ">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="cursor-default">
                              {tool.icon}
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{tool.tooltip}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-row align-bottom space-x-4 mt-4">
                    <Link href={project.github} target="_blank">
                      <Github
                        size={30}
                        className="hover:-translate-y-1 transition-transform cursor-pointer"
                      />
                    </Link>
                    <Link href={project.link} target="_blank">
                      <ArrowUpRightSquare
                        size={30}
                        className="hover:-translate-y-1 transition-transform cursor-pointer"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
