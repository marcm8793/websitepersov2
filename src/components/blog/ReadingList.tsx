"use client";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { BOOK_data, Book } from "@/config/books-data";

const ReadingList = () => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
              Author
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
              Year
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
              Theme
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
          {BOOK_data.map((book: Book, index: number) => (
            <tr
              key={index}
              className="hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <td className="whitespace-nowrap px-6 py-4">
                <Link
                  href={book.url}
                  className="flex items-center gap-2 font-medium text-blue-600 hover:underline dark:text-blue-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-balance">{book.title}</span>
                  <FaExternalLinkAlt className="h-3 w-3 flex-shrink-0" />
                </Link>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-gray-700 dark:text-gray-300">
                {book.author}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-gray-700 dark:text-gray-300">
                {book.published_year}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <span className="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {book.theme}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReadingList;
