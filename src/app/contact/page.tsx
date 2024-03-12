import Image from "next/image";
import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
};

const Page = () => {
  return (
    <div className="container justify-center flex flex-col md:flex-row pt-5">
      <div className="md:w-1/2 md:flex-row">
        <ContactForm />
      </div>
      <div className=" md:w-1/2 md:flex-row justify-center flex w-full h-auto p-5">
        <Image
          src="/icon_contact.svg"
          width={200.02}
          height={200.03}
          alt="having an idea"
        />
      </div>
    </div>
  );
};
export default Page;
