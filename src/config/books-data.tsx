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
          className="flex  items-center justify-between font-bold hover:underline hover:decoration-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          {row.original.title}
          <FaExternalLinkAlt />
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
  ] as Book[],
};
