import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/product-grid";
import {
  featuredProductHandles,
  getProductByHandle,
  type Product,
} from "@/lib/products";

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

function BenefitIcon({ kind }: { kind: "creative" | "cutting" | "beginner" | "shipping" }) {
  const shared = { fill: "none", stroke: "currentColor", strokeWidth: 1.45, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (kind === "creative") {
    return <svg aria-hidden="true" viewBox="0 0 32 32" {...shared}><path d="M16 3.5 18.7 12 27 8.5 22.8 16l6.7 4-8.8 1.2-.2 8.8-5.1-7.2-7.8 4 3.4-8.3-7.8-4.2 8.8-.6L13 5.3 16 3.5Z"/><circle cx="16" cy="16" r="2.5"/></svg>;
  }
  if (kind === "cutting") {
    return <svg aria-hidden="true" viewBox="0 0 32 32" {...shared}><path d="m8 24 15.8-15.8M6.7 9.5l4.4-4.4 5.8 5.8-4.4 4.4-5.8-5.8ZM14.8 17.6l4.4-4.4 5.8 5.8-4.4 4.4-5.8-5.8Z"/><path d="m5 27 4-4"/></svg>;
  }
  if (kind === "beginner") {
    return <svg aria-hidden="true" viewBox="0 0 32 32" {...shared}><path d="M5 15.8 16 6l11 9.8M8.5 14v12h15V14M13 26v-7h6v7"/><path d="M16 10.5v4m-2-2h4"/></svg>;
  }
  return <svg aria-hidden="true" viewBox="0 0 32 32" {...shared}><path d="M5 10.5h22v15H5zM10 10.5V7h12v3.5M5 15h22M16 15v10.5"/><path d="m12.5 19.5 2.2 2.2 4.8-5"/></svg>;
}

function BenefitsStrip() {
  const benefits = [
    { kind: "creative" as const, label: "Designed for Creative Projects" },
    { kind: "cutting" as const, label: "Tools for Precise Cutting" },
    { kind: "beginner" as const, label: "Beginner-Friendly Essentials" },
    { kind: "shipping" as const, label: "Free Shipping Across the USA" },
  ];
  return (
    <section className="benefits-strip" aria-label="Store benefits">
      <div className="container benefits-grid">
        {benefits.map((benefit) => (
          <div className="benefit-item" key={benefit.label}>
            <span className="benefit-icon"><BenefitIcon kind={benefit.kind} /></span>
            <span>{benefit.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductStory({ product }: { product: Product }) {
  return (
    <section className="story-section">
      <div className="container story-grid">
        <div className="story-image-column">
          <div className="story-image-frame">
            <Image
              src={product.image}
              alt={`${product.title} product image`}
              fill
              sizes="(max-width: 820px) 92vw, 52vw"
              unoptimized
            />
            <span className="story-image-stamp">01 <i> / </i> A QUILTER&apos;S COMPANION</span>
          </div>
          <div className="story-image-caption">
            <span>MEASURE, MARK, MAKE</span>
            <span>THE 5-IN-1 TEMPLATE</span>
          </div>
        </div>
        <div className="story-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> A THOUGHTFUL EVERYDAY TOOL</p>
          <h2>The Quilter&apos;s Companion: <em>Your 5-in-1 Essential for Perfect Cuts</em></h2>
          <p className="story-description">
            Bring five essential quilting tools into one versatile template. Clear grid markings, multiple shapes and a durable acrylic design make it easier to plan a cut and guide your rotary cutter with confidence.
          </p>
          <ul className="story-feature-list">
            <li><span className="check-mark">✓</span> Clear grid lines and multiple shape options</li>
            <li><span className="check-mark">✓</span> Angle markings for 30°, 45° and 60° cuts</li>
            <li><span className="check-mark">✓</span> Made for thoughtful, precise cutting</li>
          </ul>
          <div className="story-actions">
            <Link className="button button-primary" href={`/products/${product.handle}`}>
              SHOP THE 5-IN-1 TEMPLATE <ArrowIcon />
            </Link>
            <Link className="text-link" href="/collections/all">Explore the full collection <ArrowIcon /></Link>
          </div>
          <div className="story-signoff"><span className="signoff-rule" /> <span>YOUR NEXT PROJECT STARTS HERE</span></div>
        </div>
      </div>
    </section>
  );
}

function CollectionTiles() {
  const template = getProductByHandle("5-in-1-quilt-cutting-template");
  const guide = getProductByHandle("the-vintage-log-cabin-quilt-guide");
  const mat = getProductByHandle("quilters-cutting-mat");
  const chart = getProductByHandle("the-ultimate-quilt-chart-1");
  if (!template || !guide || !mat || !chart) return null;

  const tiles = [
    {
      title: "Cutting Templates",
      label: "For measured, considered cuts",
      image: template.image,
      href: "/collections/all?category=Cutting%20Templates",
      number: "01",
    },
    {
      title: "Quilting Guides",
      label: "A little more clarity, block by block",
      image: guide.image,
      href: "/collections/all?category=Quilting%20Guides",
      number: "02",
    },
    {
      title: "Cutting Mats",
      label: "A steady surface for the work ahead",
      image: mat.image,
      href: "/collections/all?category=Cutting%20Mats",
      number: "03",
    },
    {
      title: "Quilting Essentials",
      label: "Explore all available quilting products",
      image: chart.image,
      href: "/collections/all?category=all",
      number: "04",
    },
  ];

  return (
    <section className="shop-needs-section section-space">
      <div className="container">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow"><span className="eyebrow-line" /> SHOP BY NEED</p>
            <h2>Find the right piece <em>for your process.</em></h2>
          </div>
          <p className="section-intro">A considered collection of quilting templates, practical guides and cutting essentials.</p>
        </div>
        <div className="category-tiles">
          {tiles.map((tile) => (
            <Link className="category-tile" href={tile.href} key={tile.title}>
              <div className="category-tile-image">
                <Image src={tile.image} alt="" fill sizes="(max-width: 600px) 46vw, 25vw" unoptimized />
                <span className="category-tile-number">{tile.number} <i> / 04</i></span>
                <span className="category-tile-arrow"><ArrowIcon diagonal /></span>
              </div>
              <div className="category-tile-copy">
                <h3>{tile.title}</h3>
                <p>{tile.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePageContent() {
  const featuredProducts = featuredProductHandles
    .map((handle) => getProductByHandle(handle))
    .filter((product): product is Product => Boolean(product));
  const template = getProductByHandle("5-in-1-quilt-cutting-template");

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span className="eyebrow-dot" /> MADE FOR YOUR NEXT MASTERPIECE</p>
            <h1>Every Cut. Every Detail. <em>Beautifully Crafted.</em></h1>
            <p className="hero-description">Discover quilting essentials designed to bring greater precision, confidence, and creativity to every project.</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/collections/all">SHOP QUILTING ESSENTIALS <ArrowIcon /></Link>
              <a className="button-text-link" href="#bestsellers">EXPLORE OUR BESTSELLERS <span><ArrowIcon /></span></a>
            </div>
            <div className="hero-note">
              <span className="hero-note-symbol" aria-hidden="true">✳</span>
              <span><strong>Make with intention.</strong><small>Tools for the details that matter.</small></span>
            </div>
          </div>
          <div className="hero-visual">
            <Image
              className="hero-image"
              src="/images/quilt-workspace-hero.jpg"
              alt="Sunlit quilting workspace with colorful fabric, a cutting mat and quilting tools"
              fill
              priority
              sizes="(max-width: 820px) 100vw, 54vw"
            />
            <div className="hero-image-overlay" />
            <div className="hero-visual-topline"><span>THE CREATIVE TABLE</span><span>EST. FOR MAKING</span></div>
            <div className="hero-image-caption">
              <span>FABRIC, FORM &amp; THE JOY OF A GOOD CUT</span>
              <span className="hero-caption-mark" aria-hidden="true">↗</span>
            </div>
            <div className="hero-index">01 <span> / </span> 04</div>
          </div>
        </div>
      </section>

      <BenefitsStrip />

      {template ? <ProductStory product={template} /> : null}

      <section className="bestsellers-section section-space" id="bestsellers">
        <div className="container">
          <div className="section-heading-row bestseller-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow-line" /> CUSTOMER FAVORITES</p>
              <h2>Essentials for Your <em>Creative Journey</em></h2>
            </div>
            <div className="bestseller-intro-wrap">
              <p className="section-intro">Explore practical quilting tools and guides that help bring your next project together.</p>
              <span className="hand-drawn-star" aria-hidden="true">✳</span>
            </div>
          </div>
          <ProductGrid items={featuredProducts} />
          <div className="collection-bottom-row">
            <span className="collection-note"><span className="collection-note-line" /> Thoughtful tools for every step of the making</span>
            <Link className="button button-outline" href="/collections/all">VIEW ALL PRODUCTS <ArrowIcon /></Link>
          </div>
        </div>
      </section>

      {template ? (
        <section className="precision-section">
          <div className="container precision-grid">
            <div className="precision-visual">
              <div className="precision-photo">
                <Image
                  src={template.images[4] ?? template.image}
                  alt="Detail view of the 5 In 1 Slotted Quilt Cutting Template"
                  fill
                  sizes="(max-width: 820px) 92vw, 52vw"
                  unoptimized
                />
              </div>
              <span className="precision-photo-label">A CLOSER LOOK <i>—</i> 5-IN-1 TEMPLATE</span>
              <span className="precision-decor" aria-hidden="true">✳</span>
            </div>
            <div className="precision-copy">
              <p className="eyebrow"><span className="eyebrow-line" /> THE JOY IS IN THE DETAILS</p>
              <h2>Precision that makes <em>every piece fit.</em></h2>
              <p>Bring more confidence to your quilting process with tools and guides designed to help you plan, measure, and cut with greater clarity.</p>
              <Link className="button button-primary" href="/collections/all?category=Cutting%20Templates">DISCOVER CUTTING TOOLS <ArrowIcon /></Link>
              <div className="precision-caption"><span>MEASURE WITH CARE.</span><span>MAKE SOMETHING LASTING.</span></div>
            </div>
          </div>
        </section>
      ) : null}

      <CollectionTiles />

      <section className="inspiration-section">
        <div className="container inspiration-grid">
          <div className="inspiration-image">
            <Image
              src="/images/quilt-inspiration.jpg"
              alt="Folded patchwork quilt and carefully arranged fabric in a bright creative workspace"
              fill
              sizes="(max-width: 820px) 100vw, 58vw"
              loading="lazy"
            />
            <span className="inspiration-image-label">A PLACE FOR THE NEXT IDEA</span>
          </div>
          <div className="inspiration-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> FOR THE LOVE OF MAKING</p>
            <h2>Your Ideas. Your Fabrics. <em>Your Next Creation.</em></h2>
            <p>Find the tools and inspiration to help turn thoughtful planning into something you are proud to make.</p>
            <Link className="button button-light" href="/collections/all">EXPLORE THE STORE <ArrowIcon /></Link>
            <span className="inspiration-signature">A little care in every detail.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
