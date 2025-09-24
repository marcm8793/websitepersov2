import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

const page = () => {
  return (
    <article className="container relative max-w-3xl py-8 md:py-10 lg:py-10">
      <h1 className="inline-block text-4xl font-bold leading-tight lg:text-5xl">
        About Me
      </h1>

      <p className="text-base sm:text-lg max-w-[750px] text-balance text-muted-foreground">
        Follow my tech journey📚{" "}
      </p>
      <Separator className="my-4" />
      <div className="text-justify">
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Hey there! I&apos;m passionate about finance and technology. With a
          background in both worlds, I enjoy creating web solutions that make
          financial concepts more accessible and interactive.
        </p>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          My journey combines practical finance knowledge with modern web
          development skills. I believe technology can simplify complex financial
          processes and help people make better decisions with their money.
        </p>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          When I&apos;m not coding, you&apos;ll find me exploring fintech trends,
          reading about market innovations, or working on projects that merge
          financial data with user-friendly interfaces. This intersection keeps
          me motivated every day.
        </p>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Explore my portfolio to discover my web development projects, and feel
          free to reach out if you&apos;d like to discuss collaborations or
          learn more about me.
        </p>
      </div>
    </article>
  );
};

export default page;
