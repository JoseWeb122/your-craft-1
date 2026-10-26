import type { Metadata } from "next";
import { TrackOrderPage } from "@/components/utility-pages";

export const metadata: Metadata = {
  title: "Track Your Order | Your Craft Store",
  description: "Find your order tracking information and get help from Your Craft Store support.",
};

export default function TrackOrderRoute() {
  return <TrackOrderPage />;
}
