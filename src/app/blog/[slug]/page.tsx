import React from "react";
import { getBlogBySlug, getAllBlogSlug } from "@/app/blog/fetchers";
import { useMDXComponents } from "../../../../mdx-components";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<any> {
  const blog = await getBlogBySlug(slug);
  return {
    title: blog.frontmatter.title,
  };
}

export async function generateStaticParams() {
  return getAllBlogSlug();
}

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await getBlogBySlug(params.slug);

  // Use useMDXComponents to get the custom components
  const customComponents = useMDXComponents({});

  return (
    <article className="container relative max-w-3xl py-8 md:py-10 lg:py-10">
      <Link
        href="/blog"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[-200px] top-14 hidden xl:inline-flex"
        )}
      >
        <ChevronLeftIcon className="mr-2 h-4 w-4" />
        See all posts
      </Link>
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          {blog.frontmatter.publishDate && (
            <time dateTime={blog.frontmatter.publishDate}>
              {formatDate(blog.frontmatter.publishDate)}
            </time>
          )}
          {blog.frontmatter.publishDate ? <div>•</div> : null}
          {/* TODO: Reading time */}
        </div>
        <h1 className="inline-block text-4xl font-bold leading-tight lg:text-5xl">
          {blog.frontmatter.title}
        </h1>
        <div className="flex items-center space-x-4 pt-4">
          <Link
            href={"https://twitter.com/Marc87240"}
            className="flex items-center space-x-2 text-sm"
          >
            <Image
              src={"/logo_author.png"}
              alt={blog.frontmatter.author}
              width={40}
              height={40}
              className="rounded-full bg-white"
            />
            <div className="flex-1 text-left leading-tight">
              <p className="font-medium">{blog.frontmatter.author}</p>
              <p className="text-[12px] text-muted-foreground">
                @{"Marc87240"}
              </p>
            </div>
          </Link>
        </div>
      </div>

      {React.cloneElement(blog.content as React.ReactElement, {
        components: customComponents,
      })}
      <Separator className="my-4" />
      <Link
        href="/blog"
        className={cn(
          buttonVariants({
            variant: "ghost",
            className: "mx-auto mt-4 w-fit",
          })
        )}
      >
        <ChevronLeftIcon className="mr-2 size-4" aria-hidden="true" />
        See all posts
        <span className="sr-only">See all posts</span>
      </Link>
    </article>
  );
}
