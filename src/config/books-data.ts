import { MRT_ColumnDef } from "mantine-react-table";

export type Book = {
  title: string;
  author: string;
  published_year: number;
  theme: string;
};

export const BOOK_data = {
  columns: [
    {
      accessorKey: "title",
      header: "Title",
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
    },
  ] as Book[],
};
