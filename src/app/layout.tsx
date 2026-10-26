import type { Metadata } from "next";
import type { ReactNode } from "react";
import { StoreChrome } from "@/components/site-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Your Craft Store | Thoughtful Quilting Essentials",
  description: "Discover quilting templates, cutting mats and practical guides designed to bring greater precision and creativity to every project.",
  metadataBase: new URL("https://yourcraftstore.com"),
  openGraph: {
    title: "Your Craft Store | Thoughtful Quilting Essentials",
    description: "Quilting templates, cutting mats and practical guides for your next project.",
    siteName: "Your Craft Store",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreChrome>{children}</StoreChrome>
      </body>
    </html>
  );
}
