import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailPage from "@/components/product-detail";
import { getProductByHandle } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ handle: string }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product) return { title: "Product not found | Your Craft Store" };
  return {
    title: `${product.title} | Your Craft Store`,
    description: product.description,
  };
}

export default async function ProductRoute({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product) notFound();
  return <ProductDetailPage product={product} />;
}
