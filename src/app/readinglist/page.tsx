import ReadingList from "@/components/blog/ReadingList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reading List",
  description: "A list of books I've read and recommend.",
};

const Page = () => {
  return (
    <>
      <div className="container h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Books and guides I recommend.
            </h2>
            <p className="text-muted-foreground">
              Books still exist in the digital age! Here are some as well as
              guides I&apos;ve read and that I recommend. 📋
            </p>
          </div>
        </div>
        <ReadingList />
      </div>
    </>
  );
};

export default Page;
