import Link from "next/link";
import { getBlogs } from "./fetchers";
import { Separator } from "@/components/ui/separator";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

export default async function BlogsPage() {
  let blogs = await getBlogs();
  blogs = blogs
    .filter((blog) => blog.frontmatter.publishDate)
    .sort(
      (a: any, b: any) =>
        new Date(b.frontmatter.publishDate).getTime() -
        new Date(a.frontmatter.publishDate).getTime()
    );

  return (
    <main className="container grid items-center gap-8 pb-8 pt-6 md:py-8 md:pb-10">
      <section className="flex flex-col gap-1 mt-2.5">
        <div>
          <h1 className="font-bold leading-tight tracking-tighter lg:leading-[1.1] text-3xl md:text-4xl">
            Blog
          </h1>
          <p className="max-w-[750px] text-balance text-muted-foreground text-base sm:text-lg">
            Welcome. Explore my last articles.
          </p>
        </div>
      </section>
      <Separator />
      <div>
        {blogs.map((blog, i) => (
          <section className="flex flex-col" key={i}>
            <Link href={`/blog/${blog.slug}`}>
              <span className="sr-only">{blog.frontmatter.title}</span>
              <article className="flex flex-col">
                <div className="flex flex-col">
                  <CardHeader className="">
                    <CardTitle className="underline decoration-transparent transition duration-300 ease-in-out hover:decoration-inherit">
                      {blog.frontmatter.title}
                    </CardTitle>
                  </CardHeader>
                  <CardDescription className="text-right">
                    Published on {formatDate(blog.frontmatter.publishDate)}
                  </CardDescription>
                  <Separator className="mt-2.5" />
                </div>
              </article>
            </Link>
          </section>
        ))}
      </div>
    </main>
  );
}
