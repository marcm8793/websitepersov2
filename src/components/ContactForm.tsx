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

  const sendEmail = (e: any) => {
    e.preventDefault();
    emailjs
      .sendForm(
        process.env.EMAILJS_SERVICE_ID!,
        process.env.EMAILJS_TEMPLATE_ID!,
        form.current!,
        process.env.EMAILJS_PUBLIC_KEY!
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
    <Card>
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
              <Textarea placeholder="Type your message here." name="message" />
            </div>
            <Button type="submit">Send message</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
