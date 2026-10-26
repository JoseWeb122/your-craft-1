import type { Metadata } from "next";
import { ContactPage } from "@/components/utility-pages";

export const metadata: Metadata = {
  title: "Contact Your Craft Store",
  description: "Have a question about a product or your order? Contact Your Craft Store support.",
};

export default function ContactRoute() {
  return <ContactPage />;
}
