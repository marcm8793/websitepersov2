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
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const ContactForm = ({}) => {
  const form = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const router = useRouter();

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
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
          toast({
            title: "Error!",
            description: "Your message has not been sent.",
          });
        }
      );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Let&apos;s find solutions together.</CardTitle>
        <CardDescription>
          Send me an email and will get back to you!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={form} onSubmit={sendEmail}>
          <input type="hidden" name="to_name" value="Marc" />
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="from_name">Name</Label>
              <Input
                id="from_name"
                placeholder="Your name"
                type="text"
                name="from_name"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="from_email">Email</Label>
              <Input
                id="from_email"
                placeholder="Your email"
                type="email"
                name="from_email"
              />
            </div>
            <div className="grid w-full gap-2 h-50">
              <Textarea
                placeholder="Type your message here."
                name="message"
                rows={5}
              />
            </div>
            <Button type="submit">Send message</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
