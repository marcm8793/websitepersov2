"use client";
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import emailjs from "@emailjs/browser";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const form = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const router = useRouter();

  const sendEmail = (e: any) => {
    e.preventDefault();
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_YOUR_SERVICE_ID!,
        process.env.NEXT_PUBLIC_YOUR_TEMPLATE_ID!,
        form.current!,
        process.env.NEXT_PUBLIC_YOUR_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
          toast({
            title: "Success!",
            description: "Your message has been sent successfully.",
          });
          router.push("/");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="container justify-center flex flex-col md:flex-row pt-5">
      <div className="md:w-1/2 md:flex-row">
        <Card className="">
          <CardHeader>
            <CardTitle>Let&apos;s find solutions together.</CardTitle>
            <CardDescription>
              Send me an email and will get back to you!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form ref={form} onSubmit={sendEmail}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    type="text"
                    name="to_name"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Email</Label>
                  <Input
                    id="name"
                    placeholder="Your email"
                    type="email"
                    name="from_name"
                  />
                </div>
                <div className="grid w-full gap-2 h-50">
                  <Textarea
                    placeholder="Type your message here."
                    name="message"
                  />
                </div>
                <Button type="submit">Send message</Button>
              </div>
            </form>
          </CardContent>
        </Card>
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
