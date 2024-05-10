import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import { cn } from "@/lib/utils/utils";
import { Provider } from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import "./globals.css";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Course In Flow",
  description: "Course In Flow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(lexend.className, "antialiased min-h-screen pt-16")}>
      <Provider>
      <Navbar />
        {children}
        <Toaster />
        </Provider>
        </body>
    </html>
  );
}
