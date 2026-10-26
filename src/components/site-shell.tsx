"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { formatPrice, products } from "@/lib/products";
import { StoreProvider, useStore } from "@/components/store-context";

const mainLinks = [
  { href: "/", label: "Home" },
  { href: "/collections/all", label: "Shop All" },
  { href: "/pages/track-your-order", label: "Track Order" },
  { href: "/pages/contact", label: "Contact" },
];

const policyLinks = [
  { href: "https://yourcraftstore.com/policies/privacy-policy", label: "Privacy Policy" },
  { href: "https://yourcraftstore.com/policies/refund-policy", label: "Refund Policy" },
  { href: "https://yourcraftstore.com/policies/shipping-policy", label: "Shipping Policy" },
  { href: "https://yourcraftstore.com/policies/terms-of-service", label: "Terms of Service" },
];

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <circle cx="10.8" cy="10.8" r="6.4" stroke="currentColor" strokeWidth="1.5" />
      <path d="m15.5 15.5 4.2 4.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M5 8.5h14l-1 12H6l-1-12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 40 40" fill="none">
        <rect x="4.5" y="4.5" width="31" height="31" rx="15.5" stroke="currentColor" />
        <path d="m12 14 16 12M14 28l12-16M11 20h18M20 11v18" stroke="currentColor" strokeWidth=".9" opacity=".72" />
        <circle cx="20" cy="20" r="2.2" fill="currentColor" />
      </svg>
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const { itemCount, openCart, openSearch } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="announcement-bar">
        <span className="announcement-stitch" aria-hidden="true">✳</span>
        <span>FREE SHIPPING ALL OVER USA</span>
        <span className="announcement-side-note">A little more room for your next idea</span>
      </div>
      <div className="header-main">
        <div className="header-inner">
          <button
            type="button"
            className="mobile-menu-button icon-button"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <CloseIcon /> : (
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </button>
          <Link className="brand-lockup" href="/" aria-label="Your Craft Store home">
            <BrandMark />
            <span className="brand-name">Your Craft <strong>Store</strong></span>
          </Link>
          <nav className="desktop-navigation" aria-label="Main navigation">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? "is-active" : ""}`}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <button
              type="button"
              className="header-action search-trigger"
              aria-label="Search products"
              onClick={openSearch}
            >
              <SearchIcon />
              <span className="search-action-label">Search</span>
            </button>
            <button
              type="button"
              className="header-action bag-trigger"
              aria-label={`Shopping bag, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
              onClick={openCart}
            >
              <BagIcon />
              <span className="bag-count" aria-live="polite">{itemCount}</span>
            </button>
          </div>
        </div>
        {mobileOpen ? (
          <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation">
            {mainLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`mobile-nav-link ${pathname === link.href ? "is-active" : ""}`}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                <span className="mobile-nav-number">0{index + 1}</span>
                {link.label}
                <span className="mobile-nav-arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
            <p className="mobile-nav-note">Tools and guides for the quilts you imagine.</p>
          </nav>
        ) : null}
      </div>
    </header>
  );
}

function SearchOverlay() {
  const { searchOpen, closeSearch } = useStore();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const matches = normalizedQuery
    ? products.filter((product) =>
        `${product.title} ${product.description} ${product.category}`
          .toLowerCase()
          .includes(normalizedQuery),
      )
    : products.slice(0, 4);

  useEffect(() => {
    if (!searchOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSearch();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen, closeSearch]);

  useEffect(() => {
    if (!searchOpen) setQuery("");
  }, [searchOpen]);

  if (!searchOpen) return null;

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;
    closeSearch();
    router.push(`/collections/all?q=${encodeURIComponent(value)}`);
  }

  return (
    <div
      className="modal-backdrop search-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeSearch();
      }}
    >
      <section className="search-panel" role="dialog" aria-modal="true" aria-label="Search Your Craft Store">
        <div className="search-panel-topline">
          <p className="eyebrow">FIND YOUR NEXT ESSENTIAL</p>
          <button type="button" className="icon-button" aria-label="Close search" onClick={closeSearch}>
            <CloseIcon />
          </button>
        </div>
        <form className="search-form" onSubmit={submitSearch} role="search">
          <SearchIcon />
          <label className="sr-only" htmlFor="store-search">Search products</label>
          <input
            id="store-search"
            autoFocus
            type="search"
            placeholder="What are you looking for?"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {query ? (
            <button type="button" className="search-clear" onClick={() => setQuery("")} aria-label="Clear search">
              Clear
            </button>
          ) : null}
          <button type="submit" className="search-submit" aria-label="Search">
            <ArrowIcon />
          </button>
        </form>
        <div className="search-results-heading">
          <span>{normalizedQuery ? `${matches.length} matching ${matches.length === 1 ? "product" : "products"}` : "A few customer favorites"}</span>
          <span className="search-enter-hint">Press Enter to see all results</span>
        </div>
        {matches.length ? (
          <div className="search-result-list">
            {matches.slice(0, 5).map((product) => (
              <Link
                key={product.handle}
                href={`/products/${product.handle}`}
                className="search-result"
                onClick={closeSearch}
              >
                <span className="search-result-image">
                  <Image src={product.image} alt="" width={64} height={64} unoptimized />
                </span>
                <span className="search-result-copy">
                  <strong>{product.title}</strong>
                  <small>{product.category}</small>
                </span>
                <span className="search-result-price">{product.variants && product.variants.length > 1 ? "From " : ""}{formatPrice(product.price)}</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="search-no-results">
            <span className="search-empty-mark" aria-hidden="true">⌕</span>
            <h2>No matches just yet.</h2>
            <p>Try a different word, or browse these available quilting essentials.</p>
            <div className="search-result-list suggested-results">
              {products.slice(0, 3).map((product) => (
                <Link
                  key={product.handle}
                  href={`/products/${product.handle}`}
                  className="search-result"
                  onClick={closeSearch}
                >
                  <span className="search-result-image">
                    <Image src={product.image} alt="" width={56} height={56} unoptimized />
                  </span>
                  <span className="search-result-copy"><strong>{product.title}</strong><small>{product.category}</small></span>
                  <span className="search-result-price">{product.variants && product.variants.length > 1 ? "From " : ""}{formatPrice(product.price)}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function CartDrawer() {
  const {
    cart,
    subtotal,
    cartOpen,
    closeCart,
    setQuantity,
    removeFromCart,
  } = useStore();

  useEffect(() => {
    if (!cartOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cartOpen, closeCart]);

  return (
    <div
      className={`cart-overlay ${cartOpen ? "is-open" : ""}`}
      aria-hidden={!cartOpen}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeCart();
      }}
    >
      <aside
        className="cart-drawer"
        role="dialog"
        aria-modal={cartOpen ? "true" : undefined}
        aria-label="Shopping bag"
        aria-hidden={!cartOpen}
      >
        <div className="cart-drawer-header">
          <div>
            <p className="eyebrow">YOUR CRAFT, IN PROGRESS</p>
            <h2>Your bag <span>({cart.reduce((sum, item) => sum + item.quantity, 0)})</span></h2>
          </div>
          <button type="button" className="icon-button" onClick={closeCart} aria-label="Close shopping bag">
            <CloseIcon />
          </button>
        </div>
        {cart.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-mark" aria-hidden="true"><BagIcon /></div>
            <p className="eyebrow">A FRESH CANVAS</p>
            <h3>Your bag is waiting for the perfect project.</h3>
            <p>Explore quilting tools and guides chosen for thoughtful making.</p>
            <Link className="button button-primary" href="/collections/all" onClick={closeCart}>
              EXPLORE THE SHOP <ArrowIcon />
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <article className="cart-item" key={item.key}>
                  <Link className="cart-item-image" href={`/products/${item.handle}`} onClick={closeCart}>
                    <Image src={item.image} alt={item.title} width={96} height={112} unoptimized />
                  </Link>
                  <div className="cart-item-details">
                    <div className="cart-item-title-row">
                      <Link href={`/products/${item.handle}`} onClick={closeCart}>{item.title}</Link>
                      <button type="button" onClick={() => removeFromCart(item.key)} aria-label={`Remove ${item.title} from bag`}>
                        Remove
                      </button>
                    </div>
                    {item.variantLabel ? <p className="cart-item-variant">{item.variantLabel}</p> : null}
                    <div className="cart-item-bottom">
                      <div className="cart-quantity" aria-label={`Quantity ${item.quantity}`}>
                        <button
                          type="button"
                          onClick={() => item.quantity > 1 ? setQuantity(item.key, item.quantity - 1) : removeFromCart(item.key)}
                          aria-label="Decrease quantity"
                        >−</button>
                        <span aria-live="polite">{item.quantity}</span>
                        <button type="button" onClick={() => setQuantity(item.key, item.quantity + 1)} aria-label="Increase quantity">+</button>
                      </div>
                      <strong>{formatPrice(item.price * item.quantity)}</strong>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="cart-drawer-summary">
              <div className="cart-subtotal"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
              <p>FREE SHIPPING ALL OVER USA</p>
              <Link className="button button-primary cart-checkout-button" href="/checkout" onClick={closeCart}>
                CONTINUE TO DEMO CHECKOUT <ArrowIcon />
              </Link>
              <button type="button" className="continue-shopping" onClick={closeCart}>Continue shopping</button>
              <span className="cart-demo-note">Preview only · no payment is collected</span>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

function SiteFooter() {
  const [email, setEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  function handleNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) {
      setNewsletterMessage("Please enter your email address.");
      return;
    }
    setNewsletterMessage("Thanks for your interest. This preview is not connected to a mailing list, so your signup was not saved.");
  }

  return (
    <footer className="site-footer">
      <div className="footer-main container">
        <div className="footer-brand-column">
          <Link className="footer-brand" href="/">
            <BrandMark />
            <span>Your Craft <strong>Store</strong></span>
          </Link>
          <p>Thoughtful quilting essentials for creative minds and carefully crafted projects.</p>
          <a className="footer-email" href="mailto:support@yourcraftstore.com">support@yourcraftstore.com</a>
        </div>
        <div className="footer-link-column">
          <h2>Company</h2>
          {mainLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </div>
        <div className="footer-link-column">
          <h2>Information</h2>
          {policyLinks.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
          ))}
        </div>
        <div className="footer-newsletter">
          <p className="eyebrow">A NOTE FROM THE STUDIO</p>
          <h2>Make room for a little inspiration.</h2>
          <p>Join our newsletter for thoughtful updates from Your Craft Store.</p>
          <form className="newsletter-form" onSubmit={handleNewsletter}>
            <label className="sr-only" htmlFor="newsletter-email">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              placeholder="Your email address"
              onChange={(event) => {
                setEmail(event.target.value);
                setNewsletterMessage("");
              }}
            />
            <button type="submit" aria-label="Submit newsletter email"><ArrowIcon /></button>
          </form>
          <p className="newsletter-message" aria-live="polite">{newsletterMessage}</p>
          <span className="newsletter-disclaimer">Preview signup only; no mailing list is connected.</span>
        </div>
      </div>
      <div className="footer-bottom container">
        <span>© {new Date().getFullYear()} Your Craft Store</span>
        <span className="footer-bottom-note">Made for the joy of making.</span>
        <a href="mailto:support@yourcraftstore.com">Questions? Get in touch <ArrowIcon /></a>
      </div>
    </footer>
  );
}

export function StoreChrome({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
      <SearchOverlay />
      <CartDrawer />
    </StoreProvider>
  );
}
