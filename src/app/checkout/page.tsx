import type { Metadata } from "next";
import { DemoCheckoutPage } from "@/components/utility-pages";

export const metadata: Metadata = {
  title: "Demo Checkout | Your Craft Store",
  description: "A clearly labeled demo checkout preview for Your Craft Store.",
  robots: { index: false, follow: false },
};

export default function CheckoutRoute() {
  return <DemoCheckoutPage />;
}
