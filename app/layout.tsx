import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

// Import the monospace font
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Drop Master",
  description: "Drop Master: Your Ultimate Drop Shipping Solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TooltipProvider>
      <html lang="en">
        <body className={cn("bg-background", inter.className)}>
          {children}
          <Toaster />
        </body>
      </html>
    </TooltipProvider>
  );
}
