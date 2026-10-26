"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { ProductGrid } from "@/components/product-grid";
import { productCategories, products, type ProductCategory } from "@/lib/products";

const categoryOptions: Array<{ label: string; value: "All" | ProductCategory }> = [
  { label: "All products", value: "All" },
  { label: "Cutting Templates", value: "Cutting Templates" },
  { label: "Quilting Guides", value: "Quilting Guides" },
  { label: "Cutting Mats", value: "Cutting Mats" },
  { label: "Quilting Rulers", value: "Quilting Rulers" },
];

type SortMode = "featured" | "low" | "high" | "az" | "za";

export default function ShopAllPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | ProductCategory>("All");
  const [sort, setSort] = useState<SortMode>("featured");
  const [maxPrice, setMaxPrice] = useState(100);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("q") ?? "");
    const value = params.get("category");
    if (value === "all") {
      setCategory("All");
    } else if (productCategories.includes(value as ProductCategory)) {
      setCategory(value as ProductCategory);
    }
  }, []);

  const visibleProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesQuery = !normalized ||
        `${product.title} ${product.description} ${product.category}`.toLowerCase().includes(normalized);
      const matchesCategory = category === "All" || product.category === category;
      const matchesPrice = product.price <= maxPrice;
      return matchesQuery && matchesCategory && matchesPrice;
    });
    if (sort === "low") return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "high") return [...filtered].sort((a, b) => b.price - a.price);
    if (sort === "az") return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "za") return [...filtered].sort((a, b) => b.title.localeCompare(a.title));
    return filtered;
  }, [query, category, sort, maxPrice]);

  const hasActiveFilters = query.trim() !== "" || category !== "All" || maxPrice !== 100;

  function clearFilters() {
    setQuery("");
    setCategory("All");
    setSort("featured");
    setMaxPrice(100);
    setFiltersOpen(false);
    router.replace("/collections/all");
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function setCategoryFilter(value: "All" | ProductCategory) {
    setCategory(value);
    setFiltersOpen(false);
  }

  return (
    <div className="shop-page">
      <section className="collection-hero">
        <div className="container collection-hero-inner">
          <p className="eyebrow"><span className="eyebrow-line" /> THE YOUR CRAFT STORE COLLECTION</p>
          <h1>Tools for the <em>thoughtful maker.</em></h1>
          <div className="collection-hero-bottom">
            <p>Quilting templates, practical guides and cutting essentials for the ideas taking shape on your table.</p>
            <span>EXPLORE AT YOUR OWN PACE <i>↓</i></span>
          </div>
          <span className="collection-hero-decoration" aria-hidden="true">✳</span>
        </div>
      </section>

      <section className="shop-main container" aria-label="Shop quilting products">
        <div className="shop-toolbar">
          <div className="shop-result-count">
            <span className="result-count-number">{visibleProducts.length.toString().padStart(2, "0")}</span>
            <span>{visibleProducts.length === 1 ? "product" : "products"} to explore</span>
          </div>
          <div className="shop-toolbar-actions">
            <button type="button" className="mobile-filter-trigger" onClick={() => setFiltersOpen(true)}>
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M3 5h14M6 10h8m-5 5h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
              FILTER &amp; SORT
              {hasActiveFilters ? <span className="filter-active-dot" /> : null}
            </button>
            <label className="sort-control">
              <span>Sort by</span>
              <select value={sort} onChange={(event) => setSort(event.target.value as SortMode)}>
                <option value="featured">Featured</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
                <option value="az">Alphabetical: A–Z</option>
                <option value="za">Alphabetical: Z–A</option>
              </select>
            </label>
          </div>
        </div>

        {filtersOpen ? (
          <button type="button" className="filter-drawer-scrim" aria-label="Close filters" onClick={() => setFiltersOpen(false)} />
        ) : null}

        <div className="shop-layout">
          <aside className={`filter-sidebar ${filtersOpen ? "is-open" : ""}`} aria-label="Product filters">
            <div className="filter-sidebar-heading">
              <div><p className="eyebrow">REFINE YOUR SEARCH</p><h2>Filters</h2></div>
              <button type="button" className="icon-button filter-close" aria-label="Close filters" onClick={() => setFiltersOpen(false)}>
                <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.5" /></svg>
              </button>
            </div>
            <div className="filter-group">
              <h3>Shop by need</h3>
              <div className="filter-category-list">
                {categoryOptions.map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    className={`filter-category ${category === option.value ? "is-active" : ""}`}
                    onClick={() => setCategoryFilter(option.value)}
                    aria-pressed={category === option.value}
                  >
                    <span className="filter-radio" aria-hidden="true" />
                    <span>{option.label}</span>
                    <span className="filter-category-count">
                      {option.value === "All" ? products.length : products.filter((product) => product.category === option.value).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-group price-filter-group">
              <div className="filter-price-heading"><h3>Price</h3><span>Up to ${maxPrice}</span></div>
              <input
                aria-label="Maximum product price"
                className="price-range"
                type="range"
                min="10"
                max="100"
                step="5"
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
              />
              <div className="price-range-labels"><span>$10</span><span>$100+</span></div>
            </div>
            <div className="filter-group filter-note">
              <span className="filter-note-mark" aria-hidden="true">✳</span>
              <p>Every item here comes from the quilting collection at Your Craft Store.</p>
            </div>
            <button type="button" className="clear-filters-link" onClick={clearFilters}>CLEAR ALL FILTERS</button>
            <button type="button" className="button button-primary mobile-filter-apply" onClick={() => setFiltersOpen(false)}>
              SHOW {visibleProducts.length} {visibleProducts.length === 1 ? "PRODUCT" : "PRODUCTS"}
            </button>
          </aside>

          <div className="shop-results">
            <div className="shop-search-row">
              <form className="shop-search-form" onSubmit={submitSearch} role="search">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><circle cx="10.8" cy="10.8" r="6.4" stroke="currentColor" strokeWidth="1.5"/><path d="m15.5 15.5 4.2 4.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                <label className="sr-only" htmlFor="shop-search">Search products</label>
                <input
                  id="shop-search"
                  type="search"
                  placeholder="Search the collection"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
                {query ? <button type="button" className="shop-search-clear" onClick={() => setQuery("")} aria-label="Clear search">×</button> : null}
              </form>
              <span className="shop-search-note">Find a tool, a guide, or a little inspiration.</span>
            </div>

            {hasActiveFilters ? (
              <div className="active-filter-row">
                <span className="active-filter-label">Showing</span>
                {query.trim() ? <button type="button" className="filter-chip" onClick={() => setQuery("")}>“{query.trim()}” <span>×</span></button> : null}
                {category !== "All" ? <button type="button" className="filter-chip" onClick={() => setCategory("All")}>{category} <span>×</span></button> : null}
                {maxPrice !== 100 ? <button type="button" className="filter-chip" onClick={() => setMaxPrice(100)}>Under ${maxPrice} <span>×</span></button> : null}
                <button type="button" className="active-clear-all" onClick={clearFilters}>Clear all</button>
              </div>
            ) : null}

            {visibleProducts.length ? (
              <ProductGrid items={visibleProducts} className="shop-product-grid" />
            ) : (
              <div className="shop-empty-state">
                <span className="shop-empty-symbol" aria-hidden="true">⌕</span>
                <p className="eyebrow">NOTHING ON THIS SHELF</p>
                <h2>No products match those filters.</h2>
                <p>Try another search or clear your filters to see the full quilting collection.</p>
                <button type="button" className="button button-primary" onClick={clearFilters}>CLEAR FILTERS <span aria-hidden="true">↗</span></button>
              </div>
            )}
          </div>
        </div>
        <div className="shop-bottom-note"><span className="shop-bottom-rule" /> THE DETAILS MAKE THE DIFFERENCE <span className="shop-bottom-rule" /></div>
      </section>
    </div>
  );
}
