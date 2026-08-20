import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import ProblemSection from "@/components/ProblemSection";

export const metadata: Metadata = {
  title: "Pricing Calculator Plan | Niagara Gutter Systems Hub",
  description: "Planned interactive pricing-calculator concept for Niagara Gutter.",
};

export default function PricingPage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <main className="site-shell workstream-page pricing-placeholder-page">
      <SiteNav />
      <header className="subpage-hero container">
        <div>
          <Link className="back-link" href="/">← Systems hub</Link>
          <p className="context-line">Project 02 · Interactive build next</p>
          <h1>Brad’s pricing knowledge.<br />Captured, governed, explainable.</h1>
        </div>
        <aside className="hero-brief">
          <span>Next build</span>
          <strong>An interactive calculator using clearly synthetic example pricing.</strong>
          <p>The interface will demonstrate rule capture, calculation explanation, margin visibility, and controlled overrides.</p>
        </aside>
      </header>

      <ProblemSection
        id="pricing-problem"
        summary="Brad’s pricing knowledge needs to become a repeatable system that salespeople can use without guessing or depending on Brad for every decision."
        items={[
          "Important pricing variables and judgment may currently live primarily in Brad’s experience.",
          "Different interpretations can create inconsistent quotes or margin risk.",
          "The real pricing rules, minimums, exceptions, and approval limits still need to be documented.",
        ]}
      />

      <section className="pricing-roadmap-section container" aria-labelledby="pricing-roadmap-title">
        <div className="section-intro section-intro--compact">
          <h2 id="pricing-roadmap-title">Our roadmap</h2>
          <p>Capture Brad’s method, build deterministic rules, and prove the calculator against real quotes before rollout.</p>
        </div>
        <figure className="roadmap-visual">
          <div className="roadmap-image-scroll">
            <img
              src={`${basePath}/pricing-calculator-roadmap.webp`}
              alt="Six-step pricing calculator roadmap: Understand, Model, Build, Validate, Connect, and Prove"
              width="1672"
              height="941"
              loading="lazy"
            />
          </div>
          <figcaption>
            <span className="roadmap-caption-summary">Understand → Model → Build → Validate → Connect → Prove</span>
            <span className="roadmap-mobile-hint">Swipe through all six stages →</span>
            <strong>Understand the logic · Build the rules · Prove the price</strong>
          </figcaption>
        </figure>
      </section>

      <section className="pricing-preview container">
        <div className="pricing-canvas" aria-label="Pricing calculator feature preview">
          <div className="pricing-preview-head">
            <span>Planned calculator surface</span>
            <strong>No Niagara Gutter prices entered</strong>
          </div>
          <div className="pricing-preview-grid">
            <div><span>Job inputs</span><p>Measurements · products · access · removal · options</p></div>
            <div><span>Rules</span><p>Base tables · modifiers · minimums · approvals</p></div>
            <div><span>Result</span><p>Line items · selling price · margin · explanation</p></div>
          </div>
        </div>
        <div className="page-next page-next--split">
          <Link href="/inventory/">← Inventory approach</Link>
          <Link href="/integration/">Integration pipeline →</Link>
        </div>
      </section>

      <footer className="footer container">
        <span>Project 02 · Interactive build next</span>
        <span>WNY Automation · Synthetic pricing only</span>
      </footer>
    </main>
  );
}
