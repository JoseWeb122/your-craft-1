"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useStore } from "@/components/store-context";
import { formatPrice } from "@/lib/products";

function ArrowIcon() {
  return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

function ContactSeal() {
  return (
    <span className="contact-seal" aria-hidden="true">
      <svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="28" stroke="currentColor"/><circle cx="32" cy="32" r="17" stroke="currentColor" strokeDasharray="1 4"/><path d="m19 33 8 8 18-20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </span>
  );
}

export function TrackOrderPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [error, setError] = useState("");
  const [checked, setChecked] = useState(false);

  function submitTracking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = trackingNumber.trim();
    setChecked(false);
    if (!value) {
      setError("Please enter the tracking number from your shipping confirmation.");
      return;
    }
    if (!/^[a-zA-Z0-9\-\s]{4,50}$/.test(value)) {
      setError("That tracking number does not look right. Check it and try again.");
      return;
    }
    setError("");
    setChecked(true);
  }

  return (
    <div className="utility-page tracking-page">
      <section className="utility-hero container">
        <p className="eyebrow"><span className="eyebrow-line" /> HERE FOR THE JOURNEY</p>
        <h1>Every order has a <em>story.</em></h1>
        <p>Use the tracking number from your shipping confirmation to look up your order with the carrier.</p>
      </section>
      <section className="container utility-card-grid">
        <div className="tracking-card utility-card">
          <div className="utility-card-topline"><span className="utility-step">01</span><span>ORDER TRACKING</span></div>
          <h2>Where is your parcel?</h2>
          <p className="utility-card-description">Enter your tracking number below. You can find it in the shipping confirmation email for your order.</p>
          <form className="tracking-form" onSubmit={submitTracking} noValidate>
            <label htmlFor="tracking-number">Tracking number</label>
            <div className={`tracking-input-wrap ${error ? "has-error" : ""}`}>
              <input
                id="tracking-number"
                name="trackingNumber"
                type="text"
                autoComplete="off"
                placeholder="Enter your tracking number"
                value={trackingNumber}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "tracking-error" : "tracking-hint"}
                onChange={(event) => {
                  setTrackingNumber(event.target.value);
                  setError("");
                  setChecked(false);
                }}
              />
              <button type="submit" className="button button-primary">LOOK UP <ArrowIcon /></button>
            </div>
            {error ? <p className="field-error" id="tracking-error" role="alert">{error}</p> : <p className="form-hint" id="tracking-hint">Use the number from your shipping confirmation.</p>}
          </form>
          {checked ? (
            <div className="tracking-demo-message" role="status">
              <span className="status-mark" aria-hidden="true">i</span>
              <div><strong>Live tracking isn&apos;t connected in this preview.</strong><p>Your number has not been looked up. Please use the carrier link in your shipping email, or contact support for help.</p></div>
            </div>
          ) : null}
          <div className="tracking-honesty-note"><span aria-hidden="true">✳</span> This preview does not connect to carrier or order data.</div>
        </div>
        <aside className="tracking-aside">
          <div className="tracking-aside-symbol" aria-hidden="true">
            <svg viewBox="0 0 72 72" fill="none"><path d="M14 22h44v34H14zM22 22v-6h28v6M14 31h44M28 31v25" stroke="currentColor" strokeWidth="1.4"/><path d="m30 42 4 4 8-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <p className="eyebrow">A HAND WITH YOUR ORDER?</p>
          <h2>We&apos;re happy to help.</h2>
          <p>For questions about your order, write to our support team and include your order details.</p>
          <a className="text-link" href="mailto:support@yourcraftstore.com">EMAIL SUPPORT <ArrowIcon /></a>
          <div className="tracking-aside-email">support@yourcraftstore.com</div>
        </aside>
      </section>
      <div className="utility-bottom-note"><Link href="/collections/all">Back to the shop <ArrowIcon /></Link></div>
    </div>
  );
}

type ContactValues = { name: string; email: string; phone: string; message: string };

export function ContactPage() {
  const [values, setValues] = useState<ContactValues>({ name: "", email: "", phone: "", message: "" });
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function updateField(field: keyof ContactValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setError("");
    setSubmitted(false);
  }

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = values.name.trim();
    const email = values.email.trim();
    const message = values.message.trim();
    if (!name || !email || !message) {
      setError("Please complete your name, email address, and message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (message.length < 10) {
      setError("Please add a little more detail to your message (at least 10 characters).");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  return (
    <div className="utility-page contact-page">
      <section className="contact-hero container">
        <div className="contact-hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> A NOTE, A QUESTION, A HELLO</p>
          <h1>We&apos;re here <em>to help.</em></h1>
          <p>Have a question about a product or your order? Send us a message and we&apos;ll be happy to help.</p>
          <a className="contact-email-card" href="mailto:support@yourcraftstore.com">
            <span className="contact-email-icon" aria-hidden="true">✉</span>
            <span><small>REACH OUR SUPPORT TEAM</small><strong>support@yourcraftstore.com</strong></span>
            <span className="contact-email-arrow" aria-hidden="true">↗</span>
          </a>
          <div className="contact-handwritten">Every good project starts with a conversation.</div>
        </div>
        <div className="contact-form-card">
          <div className="contact-form-heading">
            <div><p className="eyebrow">SEND US A MESSAGE</p><h2>How can we help?</h2></div>
            <ContactSeal />
          </div>
          {submitted ? (
            <div className="contact-success" role="status">
              <span className="success-check" aria-hidden="true">✓</span>
              <p className="eyebrow">MESSAGE PREPARED</p>
              <h3>Thank you, {values.name.trim()}.</h3>
              <p>Your message has been prepared in this preview, but it has not been sent. Please email <a href="mailto:support@yourcraftstore.com">support@yourcraftstore.com</a> to reach the team.</p>
              <button type="button" className="text-link" onClick={() => { setSubmitted(false); setValues({ name: "", email: "", phone: "", message: "" }); }}>WRITE ANOTHER MESSAGE <ArrowIcon /></button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={submitContact} noValidate>
              <div className="contact-form-two">
                <div className="form-field">
                  <label htmlFor="contact-name">Name <span>*</span></label>
                  <input id="contact-name" name="name" autoComplete="name" placeholder="Your name" value={values.name} onChange={(event) => updateField("name", event.target.value)} aria-required="true" />
                </div>
                <div className="form-field">
                  <label htmlFor="contact-email">Email <span>*</span></label>
                  <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={values.email} onChange={(event) => updateField("email", event.target.value)} aria-required="true" />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="contact-phone">Phone <small>OPTIONAL</small></label>
                <input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" value={values.phone} onChange={(event) => updateField("phone", event.target.value)} />
              </div>
              <div className="form-field">
                <label htmlFor="contact-message">Message <span>*</span></label>
                <textarea id="contact-message" name="message" rows={5} placeholder="Tell us a little about what you need…" value={values.message} onChange={(event) => updateField("message", event.target.value)} aria-required="true" />
              </div>
              {error ? <p className="field-error contact-form-error" role="alert">{error}</p> : null}
              <button type="submit" className="button button-primary contact-submit">SEND YOUR MESSAGE <ArrowIcon /></button>
              <p className="contact-demo-note">Preview form only · messages are not emailed or stored.</p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

export function DemoCheckoutPage() {
  const { cart, subtotal, openCart } = useStore();

  return (
    <div className="utility-page checkout-page">
      <section className="checkout-header container">
        <p className="eyebrow"><span className="eyebrow-line" /> A PREVIEW, NOT A PURCHASE</p>
        <h1>Your project, <em>almost ready.</em></h1>
        <p>This is a demo checkout screen. Your Craft Store is not connected to a payment provider, and no order can be placed here.</p>
      </section>
      <section className="container checkout-layout">
        {cart.length === 0 ? (
          <div className="checkout-empty">
            <span className="checkout-empty-symbol" aria-hidden="true">✳</span>
            <p className="eyebrow">NOTHING IN YOUR BAG</p>
            <h2>A new idea begins with a first pick.</h2>
            <Link className="button button-primary" href="/collections/all">EXPLORE THE SHOP <ArrowIcon /></Link>
          </div>
        ) : (
          <>
            <div className="checkout-demo-card">
              <div className="checkout-demo-icon" aria-hidden="true">i</div>
              <p className="eyebrow">DEMO CHECKOUT</p>
              <h2>No payment will be collected.</h2>
              <p>The cart below is saved in this browser for demonstration. This preview does not create an order, charge a payment method, or send an order confirmation.</p>
              <div className="checkout-demo-links">
                <a href="https://yourcraftstore.com/policies/shipping-policy" target="_blank" rel="noreferrer">Shipping Policy</a>
                <a href="https://yourcraftstore.com/policies/refund-policy" target="_blank" rel="noreferrer">Refund Policy</a>
              </div>
              <Link className="button button-primary" href="/collections/all">CONTINUE SHOPPING <ArrowIcon /></Link>
            </div>
            <div className="checkout-summary-card">
              <div className="checkout-summary-heading"><h2>Your bag</h2><button type="button" onClick={openCart}>Edit bag</button></div>
              <div className="checkout-line-items">
                {cart.map((item) => (
                  <div className="checkout-line-item" key={item.key}>
                    <span className="checkout-line-image"><Image src={item.image} alt={item.title} width={76} height={84} unoptimized /><span>{item.quantity}</span></span>
                    <span className="checkout-line-copy"><strong>{item.title}</strong>{item.variantLabel ? <small>{item.variantLabel}</small> : null}</span>
                    <span className="checkout-line-price">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="checkout-subtotal-row"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
              <p className="checkout-shipping-note">FREE SHIPPING ALL OVER USA</p>
              <div className="checkout-no-payment">Demo preview — no payment collected</div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
