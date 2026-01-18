import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { useMDXComponents as getMDXComponents } from "../../../mdx-components";

const contentDir = path.join(process.cwd(), "src/app/blog/_mdx-content");

export async function getBlogBySlug(slug: string) {
  try {
    const fileName = slug + ".mdx";
    const filePath = path.join(contentDir, fileName);
    const fileContent = fs.readFileSync(filePath, "utf8");

    const { frontmatter, content } = await compileMDX<{
      title: string;
      author: string;
      publishDate: string;
    }>({
      source: fileContent,
      components: getMDXComponents({}),
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [
              rehypePrettyCode as any,
              {
                theme: {
                  dark: "github-dark",
                  light: "github-light",
                },
                keepBackground: false,
                defaultLang: "plaintext",
                onVisitLine(node: any) {
                  // Prevent empty lines from collapsing
                  if (node.children.length === 0) {
                    node.children = [{ type: "text", value: " " }];
                  }
                },
                onVisitHighlightedLine(node: any) {
                  if (node.properties.className) {
                    node.properties.className.push("line--highlighted");
                  } else {
                    node.properties.className = ["line--highlighted"];
                  }
                },
                onVisitHighlightedChars(node: any) {
                  node.properties.className = ["word--highlighted"];
                },
              },
            ],
          ],
        },
      },
    });

    return {
      frontmatter,
      content,
      slug: path.parse(fileName).name,
    };
  } catch (e) {
    console.error("Error compiling MDX:", e);
    return notFound();
  }
}

export async function getBlogs() {
  const files = fs.readdirSync(contentDir);
  const blogs = await Promise.all(
    files.map(async (file) => await getBlogBySlug(path.parse(file).name))
  );
  return blogs;
}

export function getAllBlogSlug() {
  const files = fs.readdirSync(contentDir);
  const slugs = files.map((file) => ({ slug: path.parse(file).name }));
  return slugs;
}
