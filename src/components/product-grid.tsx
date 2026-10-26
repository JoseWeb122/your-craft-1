"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  formatPrice,
  type Product,
  type StoreVariant,
} from "@/lib/products";
import { useStore } from "@/components/store-context";

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return diagonal ? (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M5 15 15 5M6 5h9v9" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function QuantityStepper({
  quantity,
  onChange,
}: {
  quantity: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="quantity-stepper" aria-label="Quantity">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(1, quantity - 1))}
      >
        −
      </button>
      <span aria-live="polite">{quantity}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(quantity + 1)}
      >
        +
      </button>
    </div>
  );
}

function QuickAddDialog({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { addToCart } = useStore();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [quantity, setQuantity] = useState(1);
  const variants = product.variants ?? [];
  const selectedVariant = variants[selectedIndex];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const previewImage = selectedVariant?.image ?? product.image;

  return (
    <div
      className="modal-backdrop quick-add-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="quick-add-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-add-title"
      >
        <button
          type="button"
          className="icon-button modal-close"
          aria-label="Close size selection"
          onClick={onClose}
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
            <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
        <div className="quick-add-image">
          <Image
            src={previewImage}
            alt={product.title}
            fill
            sizes="(max-width: 700px) 40vw, 260px"
            unoptimized
          />
        </div>
        <div className="quick-add-content">
          <p className="eyebrow">CHOOSE AN OPTION</p>
          <h2 id="quick-add-title">{product.title}</h2>
          <p className="quick-add-price">
            {selectedVariant
              ? formatPrice(selectedVariant.price)
              : `From ${formatPrice(product.price)}`}
            {selectedVariant?.compareAt ? (
              <span className="price-was">{formatPrice(selectedVariant.compareAt)}</span>
            ) : null}
          </p>
          <fieldset className="variant-options">
            <legend>Size / option</legend>
            {variants.map((variant, index) => (
              <button
                type="button"
                key={variant.id}
                className={`variant-option ${index === selectedIndex ? "is-selected" : ""}`}
                onClick={() => setSelectedIndex(index)}
                aria-pressed={index === selectedIndex}
              >
                <span>{variant.label}</span>
                <span>{formatPrice(variant.price)}</span>
              </button>
            ))}
          </fieldset>
          <div className="quick-add-controls">
            <QuantityStepper quantity={quantity} onChange={setQuantity} />
            <button
              type="button"
              className="button button-primary quick-add-submit"
              disabled={!selectedVariant}
              onClick={() => {
                if (!selectedVariant) return;
                addToCart(product, selectedVariant, quantity);
                onClose();
              }}
            >
              ADD TO BAG <ArrowIcon />
            </button>
          </div>
          {!selectedVariant ? (
            <p className="form-hint">Select an option to continue.</p>
          ) : null}
          <Link
            className="quick-add-view-link"
            href={`/products/${product.handle}`}
            onClick={onClose}
          >
            View full product details <ArrowIcon diagonal />
          </Link>
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useStore();
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const needsOption = (product.variants?.length ?? 0) > 1;
  const primaryVariant = product.variants?.[0];

  function handleQuickAdd() {
    if (needsOption) {
      setQuickAddOpen(true);
      return;
    }
    addToCart(product, primaryVariant);
  }

  return (
    <>
      <article className="product-card">
        <div className="product-card-image">
          <Link
            className="product-image-link"
            href={`/products/${product.handle}`}
            aria-label={`View ${product.title}`}
          >
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 600px) 46vw, (max-width: 1000px) 44vw, 25vw"
              unoptimized
            />
          </Link>
          {product.saleBadge ? <span className="product-badge">{product.saleBadge}</span> : null}
          {product.digital ? <span className="product-format">DIGITAL GUIDE</span> : null}
          <button
            type="button"
            className="product-quick-add"
            onClick={handleQuickAdd}
            aria-label={needsOption ? `Choose options for ${product.title}` : `Add ${product.title} to bag`}
          >
            {needsOption ? "CHOOSE OPTIONS" : "QUICK ADD"}
            <span aria-hidden="true">+</span>
          </button>
        </div>
        <div className="product-card-info">
          <p className="product-card-category">{product.category}</p>
          <Link className="product-card-title" href={`/products/${product.handle}`}>
            {product.title}
          </Link>
          <div className="product-card-price-row">
            <p className="product-card-price">
              {needsOption ? <span className="from-label">From </span> : null}
              {formatPrice(product.price)}
            </p>
            {product.compareAt ? (
              <span className="price-was">{formatPrice(product.compareAt)}</span>
            ) : null}
          </div>
          <div className="product-card-actions">
            <Link href={`/products/${product.handle}`} className="product-view-link">
              VIEW PRODUCT <ArrowIcon diagonal />
            </Link>
            <button
              type="button"
              className="product-add-icon"
              onClick={handleQuickAdd}
              aria-label={needsOption ? `Select options for ${product.title}` : `Quick add ${product.title}`}
            >
              <span aria-hidden="true">+</span>
            </button>
          </div>
        </div>
      </article>
      {quickAddOpen ? (
        <QuickAddDialog product={product} onClose={() => setQuickAddOpen(false)} />
      ) : null}
    </>
  );
}

export function ProductGrid({
  items,
  className = "",
}: {
  items: Product[];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <div className={`product-grid ${className}`.trim()}>
      {items.map((product) => (
        <ProductCard product={product} key={product.handle} />
      ))}
    </div>
  );
}

export { QuantityStepper };
