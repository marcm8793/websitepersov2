import { Separator } from "@/components/ui/separator";

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
          Hey there! I&apos;m deeply passionate about tech & coding. My interest
          in programming is a genuine drive that constantly leads me to explore
          new opportunities in the world of web development.
        </p>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          I firmly believe that our future is becoming increasingly digital, and
          I want to play an active role in this transformation. I love learning
          new languages and technologies, and I&apos;m always on the lookout for
          exciting projects to expand my skills.
        </p>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          When I&apos;m not coding, you&apos;ll probably find me reading about
          the latest tech trends or learning another JS framework😜. My desire
          to learn and contribute to the world of technology keeps me motivated
          every day.
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
