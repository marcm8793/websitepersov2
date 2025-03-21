import { MRT_ColumnDef } from "mantine-react-table";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

export type Book = {
  title: string;
  author: string;
  published_year: number;
  theme: string;
  url: string;
};

export const BOOK_data = {
  columns: [
    {
      accessorKey: "title",
      header: "Title",
      Cell: ({ row }) => (
        <Link
          href={row.original.url}
          className="flex items-center justify-between font-bold hover:underline hover:decoration-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="flex-grow text-balance">{row.original.title}</span>
          <FaExternalLinkAlt
            className="ml-2 flex-shrink-0"
            width={15}
            height={15}
          />
        </Link>
      ),
    },
    {
      accessorKey: "author",
      header: "Author",
    },
    {
      accessorKey: "published_year",
      header: "Year of Publication",
    },
    {
      accessorKey: "theme",
      header: "Theme",
    },
  ] as MRT_ColumnDef<Book>[],
  data: [
    {
      title: "Learn enough developer tools to be dangerous",
      author: "Michael Hartl",
      published_year: 2018,
      theme: "Terminal",
      url: "https://www.learnenough.com/command-line-tutorial",
    },
    {
      title: "React-Native guide",
      author: "Adrian Hajdin/JS Mastery",
      published_year: 2024,
      theme: "React-Native",
      url: "https://drive.google.com/file/d/1mWGl_eGN34RfUIHheRmGoLyu-phkGd3m/view?usp=sharing",
    },
    {
      title: "How to setup custom email with CloudFlare and Mailgun",
      author: "San B",
      published_year: 2024,
      theme: "Domains/ Email",
      url: "https://www.freecodecamp.org/news/how-to-set-up-custom-email/",
    },
    {
      title: "HTTP/3 explained",
      author: "Daniel Stenberg",
      published_year: 2018,
      theme: "Network",
      url: "https://http3-explained.haxx.se/",
    },
    {
      title: "How to set up Next.js 15 for production in 2024",
      author: "Jan Hesters",
      published_year: 2024,
      theme: "Next.js",
      url: "https://www.reactsquad.io/blog/how-to-set-up-next-js-15-for-production",
    },
    {
      title: "Essential tsconfig.json options you should use",
      author: "Duy NG",
      published_year: 2024,
      theme: "Typescript",
      url: "https://tduyng.com/blog/tsconfig-options-you-should-use/",
    },
    {
      title: "Unleash JS's Potential with Functional Programming",
      author: "Jan Hesters",
      published_year: 2024,
      theme: "JavaScript",
      url: "https://janhesters.com/blog/unleash-javascripts-potential-with-functional-programming?ck_subscriber_id=2185120188",
    },
    {
      title: "What's OAuth2 Anyway?",
      author: "Roman Glushko",
      published_year: 2025,
      theme: "Authentication",
      url: "https://www.romaglushko.com/blog/whats-aouth2/",
    },
    {
      title: "How to Secure a Next.js AI Application Deployed on Vercel",
      author: "Gideon Akinsanmi",
      published_year: 2024,
      theme: "Next.js",
      url: "https://www.freecodecamp.org/news/how-to-secure-a-nextjs-ai-application-deployed-on-vercel/",
    },
  ] as Book[],
};
