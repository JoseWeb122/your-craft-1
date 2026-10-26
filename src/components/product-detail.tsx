"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductGrid, QuantityStepper } from "@/components/product-grid";
import { useStore } from "@/components/store-context";
import { formatPrice, products, type Product } from "@/lib/products";

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return diagonal ? (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M5 15 15 5M6 5h9v9" stroke="currentColor" strokeWidth="1.5" /></svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" /></svg>
  );
}

function ZoomViewer({
  images,
  index,
  title,
  onChange,
  onClose,
}: {
  images: string[];
  index: number;
  title: string;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onChange((index + 1) % images.length);
      if (event.key === "ArrowLeft") onChange((index - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [images.length, index, onChange, onClose]);

  return (
    <div className="zoom-viewer" role="dialog" aria-modal="true" aria-label={`${title} image viewer`}>
      <button type="button" className="icon-button zoom-close" onClick={onClose} aria-label="Close image viewer">
        <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.6" /></svg>
      </button>
      <button type="button" className="zoom-arrow zoom-previous" aria-label="Previous image" onClick={() => onChange((index - 1 + images.length) % images.length)}>←</button>
      <div className="zoom-viewer-image">
        <Image src={images[index]} alt={`${title}, image ${index + 1}`} fill sizes="90vw" unoptimized />
      </div>
      <button type="button" className="zoom-arrow zoom-next" aria-label="Next image" onClick={() => onChange((index + 1) % images.length)}>→</button>
      <p className="zoom-image-count">{String(index + 1).padStart(2, "0")} <span>/</span> {String(images.length).padStart(2, "0")}</p>
    </div>
  );
}

export default function ProductDetailPage({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart } = useStore();
  const [imageIndex, setImageIndex] = useState(0);
  const [variantIndex, setVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [zoomOpen, setZoomOpen] = useState(false);
  const variants = product.variants ?? [];
  const selectedVariant = variants.length ? variants[variantIndex] : undefined;
  const price = selectedVariant?.price ?? product.price;
  const compareAt = selectedVariant?.compareAt ?? (!selectedVariant ? product.compareAt : undefined);
  const galleryImages = product.images.length ? product.images : [product.image];
  const currentImage = galleryImages[imageIndex] ?? selectedVariant?.image ?? product.image;
  const related = products
    .filter((item) => item.handle !== product.handle && item.category === product.category)
    .concat(products.filter((item) => item.handle !== product.handle && item.category !== product.category))
    .slice(0, 3);
  const categoryHref = `/collections/all?category=${encodeURIComponent(product.category)}`;
  const detailSaleBadge = product.saleBadge && (!selectedVariant || selectedVariant.id === variants[0]?.id)
    ? product.saleBadge
    : undefined;

  function chooseVariant(index: number) {
    setVariantIndex(index);
    const selectedImage = variants[index]?.image;
    if (selectedImage) {
      const matchingIndex = galleryImages.indexOf(selectedImage);
      if (matchingIndex >= 0) setImageIndex(matchingIndex);
    }
  }

  function handleBuyNow() {
    addToCart(product, selectedVariant, quantity, false);
    router.push("/checkout");
  }

  return (
    <div className="product-detail-page">
      <div className="container product-breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span>/</span><Link href="/collections/all">Shop All</Link><span>/</span><Link href={categoryHref}>{product.category}</Link><span>/</span><span aria-current="page">{product.title}</span>
      </div>

      <section className="container product-detail-grid">
        <div className="product-gallery">
          <div className="product-main-image" onClick={() => setZoomOpen(true)}>
            <Image
              src={currentImage}
              alt={`${product.title} product image`}
              fill
              sizes="(max-width: 820px) 100vw, 54vw"
              unoptimized
            />
            <button type="button" className="image-zoom-trigger" aria-label="Open image viewer" onClick={(event) => { event.stopPropagation(); setZoomOpen(true); }}>
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><circle cx="8.5" cy="8.5" r="5" stroke="currentColor" strokeWidth="1.3"/><path d="m12.2 12.2 4.1 4.1M8.5 6v5m-2.5-2.5h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
              <span>Zoom</span>
            </button>
          </div>
          {galleryImages.length > 1 ? (
            <div className="product-thumbnails" aria-label="Product images">
              {galleryImages.map((image, index) => (
                <button
                  type="button"
                  key={image}
                  className={`product-thumbnail ${index === imageIndex ? "is-selected" : ""}`}
                  onClick={() => setImageIndex(index)}
                  aria-label={`Show product image ${index + 1}`}
                  aria-pressed={index === imageIndex}
                >
                  <Image src={image} alt="" fill sizes="84px" unoptimized />
                </button>
              ))}
            </div>
          ) : null}
          <div className="gallery-caption"><span>YOUR CRAFT STORE</span><span>PRODUCT DETAIL <i>·</i> {product.category.toUpperCase()}</span></div>
        </div>

        <div className="product-detail-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> {product.digital ? "DIGITAL QUILTING GUIDE" : product.category.toUpperCase()}</p>
          <h1>{product.title}</h1>
          <div className="detail-price-row">
            <span className="detail-price">{formatPrice(price)}</span>
            {compareAt ? <span className="price-was">{formatPrice(compareAt)}</span> : null}
            {detailSaleBadge ? <span className="detail-sale-badge">{detailSaleBadge}</span> : null}
          </div>
          <p className="detail-description">{product.description}</p>

          <ul className="detail-benefits">
            {product.features.map((feature) => (
              <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>
            ))}
          </ul>

          {variants.length > 1 ? (
            <fieldset className="detail-variant-group">
              <legend className="variant-label-row"><span>Choose an option</span><span className="variant-selected-label">{selectedVariant?.label}</span></legend>
              <div className="detail-variant-list">
                {variants.map((variant, index) => (
                  <button
                    type="button"
                    key={variant.id}
                    className={`detail-variant-button ${index === variantIndex ? "is-selected" : ""}`}
                    onClick={() => chooseVariant(index)}
                    aria-pressed={index === variantIndex}
                  >
                    <span className="variant-radio" aria-hidden="true" />
                    <span className="detail-variant-name">{variant.label}</span>
                    <span className="detail-variant-price">{formatPrice(variant.price)}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          ) : null}

          <div className="detail-quantity-row">
            <span>Quantity</span>
            <QuantityStepper quantity={quantity} onChange={setQuantity} />
          </div>

          <div className="detail-actions">
            <button
              type="button"
              className="button button-primary detail-add-button"
              onClick={() => addToCart(product, selectedVariant, quantity)}
            >
              ADD TO BAG — {formatPrice(price)} <span aria-hidden="true">↗</span>
            </button>
            <button type="button" className="button button-outline detail-buy-button" onClick={handleBuyNow}>
              BUY NOW <ArrowIcon />
            </button>
          </div>
          <p className="detail-demo-note">Preview only · this storefront is not connected to checkout or payment processing.</p>

          <div className="detail-trust-note">
            <span className="detail-trust-icon" aria-hidden="true">✳</span>
            <span>FREE SHIPPING ALL OVER USA</span>
          </div>

          <div className="product-accordions">
            <details>
              <summary>Product details <span aria-hidden="true">+</span></summary>
              <div className="accordion-copy">
                <p>{product.description}</p>
                {product.features.length ? <ul>{product.features.map((feature) => <li key={feature}>{feature}</li>)}</ul> : null}
              </div>
            </details>
            <details>
              <summary>Shipping information <span aria-hidden="true">+</span></summary>
              <div className="accordion-copy">
                <p>FREE SHIPPING ALL OVER USA. For the complete store shipping information, please see the original shipping policy.</p>
                <a href="https://yourcraftstore.com/policies/shipping-policy" target="_blank" rel="noreferrer">Read the Shipping Policy <ArrowIcon diagonal /></a>
              </div>
            </details>
            <details>
              <summary>Returns &amp; refunds <span aria-hidden="true">+</span></summary>
              <div className="accordion-copy">
                <p>For the store&apos;s current return and refund terms, please review the original policy before placing an order.</p>
                <a href="https://yourcraftstore.com/policies/refund-policy" target="_blank" rel="noreferrer">Read the Refund Policy <ArrowIcon diagonal /></a>
              </div>
            </details>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="related-section section-space">
          <div className="container">
            <div className="section-heading-row">
              <div><p className="eyebrow"><span className="eyebrow-line" /> KEEP EXPLORING</p><h2>More for your <em>making table.</em></h2></div>
              <Link className="text-link" href="/collections/all">View all products <ArrowIcon /></Link>
            </div>
            <ProductGrid items={related} />
          </div>
        </section>
      ) : null}

      {zoomOpen ? <ZoomViewer images={galleryImages} index={imageIndex} title={product.title} onChange={setImageIndex} onClose={() => setZoomOpen(false)} /> : null}
    </div>
  );
}
