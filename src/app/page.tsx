import CodewarsActivity from "@/components/coding-activity/CodewarsActivity";
import GitHubActivity from "@/components/coding-activity/GitHubActivity";
import { Bot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className=" container flex flex-col text-center items-center justify-center my-10 py-10 md:flex-row md:text-left">
        <div className="md:mt-2 md:w-1/2 items-center justify-center flex ">
          <Image
            src="/pc.jpg"
            alt="photo pc"
            width={380}
            height={380}
            className="shadow-2xl rounded-xl w-auto h-auto"
            priority
          />
        </div>
        <div className="md:mt-2 md:w-1/2">
          <h1 className="text-4xl font-bold mt-6 md:mt-0 md:text-7xl">
            Hi, I&#39;m Marc!
          </h1>
          <p className="text-lg mt-4 mb-6 md:text-2xl">
            I&#39;m a{" "}
            <span className="font-semibold text-teal-600">
              tech enthusiast.{" "}
            </span>
            Working towards creating web applications that makes life easier and
            more meaningful.
          </p>
          <Link
            href="projects"
            className="text-neutral-100 font-semibold px-6 py-3 bg-teal-600 rounded shadow hover:bg-teal-700"
          >
            Projects
          </Link>
          <p className="py-6">
            Unlock a smart chat assistant! Click the{" "}
            <Bot className="inline pb-1" /> icon to activate the AI and get
            instant answers to your questions about me. Explore relevant website
            sections just by asking the bot!
          </p>
        </div>
      </div>

      {/* GitHub Activity */}
      <div className="container mx-auto p-6 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">GitHub Activity</h1>
          <p className="text-muted-foreground">
            Track my coding progress and achievements on GitHub
          </p>
        </div>
        <GitHubActivity username="marcm8793" className="max-w-4xl mx-auto" />
      </div>

      {/* Codewars Activity */}
      <div className="container mx-auto p-6 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Codewars Activity</h1>
          <p className="text-muted-foreground">
            Track my coding progress and achievements on Codewars
          </p>
        </div>
        <CodewarsActivity username="marcm8793" className="max-w-4xl mx-auto" />
      </div>
    </>
  );
}
