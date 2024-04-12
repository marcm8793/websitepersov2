"use client";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { MantineProvider } from "@mantine/core";
import { BOOK_data, Book } from "@/config/books-data";

const ReadingList = () => {
  const table = useMantineReactTable<Book>(BOOK_data);

  return (
    <>
      <div className="dark:hidden">
        <MantineProvider
          theme={{
            primaryColor: "blue",
            primaryShade: 9,
            colorScheme: "light",
          }}
        >
          <MantineReactTable table={table} />
        </MantineProvider>
      </div>
      <div className="hidden dark:block">
        <MantineProvider
          theme={{
            primaryColor: "blue",
            primaryShade: 9,
            fontFamily: "Poppins, sans-serif",
            colorScheme: "dark",
          }}
        >
          <MantineReactTable table={table} />
        </MantineProvider>
      </div>
    </>
  );
};

export default ReadingList;
