import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Topbar } from "@/components/layout/topbar";
import { ThemeProvider } from "@/components/layout/theme-provider";
import QueryProvider from "@/components/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://marcmansour.dev"),
  title: {
    default: "Portfolio website | Marc Mansour",
    template: "%s | Marc Mansour",
  },
  description: "Web portfolio with AI chatbot",
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Topbar />
            <main className="flex-grow">{children}</main>
            <Toaster />
            <Footer />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
