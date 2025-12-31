import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // TurboPack
  turbopack: {},
  // Configure `pageExtensions`` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [],
    rehypePlugins: [
      [
        "rehype-pretty-code",
        {
          theme: {
            dark: "github-dark",
            light: "github-light",
          },
          keepBackground: false,
          defaultLang: "javascript",
          grid: false,
        },
      ],
    ],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
