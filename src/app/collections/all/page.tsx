import type { Metadata } from "next";
import ShopAllPage from "@/components/shop-page";

export const metadata: Metadata = {
  title: "Shop All Quilting Essentials | Your Craft Store",
  description: "Browse quilting templates, cutting mats and practical quilting guides from Your Craft Store.",
};

export default function ShopAllRoute() {
  return <ShopAllPage />;
}
