import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Inventory Application Plan | Niagara Gutter Systems Hub",
  description: "Assessment and implementation approach for Niagara Gutter’s existing inventory application.",
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const inspectionAreas = [
  ["Application", "Code · hosting · database · authentication · backups · environments"],
  ["Inventory", "Coil · colors · profiles · downspouts · guards · fittings · fasteners"],
  ["Locations", "Warehouse · bins · trucks · jobsites · returns · damaged stock · scrap"],
  ["Transactions", "Purchase · receive · transfer · reserve · issue · return · adjust · count"],
  ["People", "Office · warehouse · purchasing · crew leads · installers · managers"],
  ["Controls", "Permissions · negative stock · approvals · history · reconciliation · alerts"],
];

export default function InventoryPage() {
  return (
    <main className="site-shell workstream-page">
      <SiteNav />

      <header className="subpage-hero container">
        <div>
          <Link className="back-link" href="/">← Systems hub</Link>
          <p className="context-line">Project 01 · Existing system first</p>
          <h1>Finish what exists.<br />Replace only with evidence.</h1>
        </div>
        <aside className="hero-brief">
          <span>Confirmed</span>
          <strong>An inventory application has already been started.</strong>
          <p>The responsible first move is assessment—not presenting a competing rebuild before seeing the current system.</p>
        </aside>
      </header>

      <section className="roadmap-visual-section container" aria-label="Inventory application roadmap">
        <figure className="roadmap-visual">
          <div className="roadmap-image-scroll">
            <img
              src={`${basePath}/inventory-application-roadmap.webp`}
              alt="Six-step inventory application roadmap: Understand, Map, Decide, Design, Connect, and Prove"
              width="1672"
              height="941"
              fetchPriority="high"
            />
          </div>
          <figcaption>
            <span className="roadmap-caption-summary">Six steps from assessment to rollout</span>
            <span className="roadmap-mobile-hint">Swipe through all six steps →</span>
            <strong>Understand before selecting tools</strong>
          </figcaption>
        </figure>
      </section>

      <section className="map-section container" aria-labelledby="inventory-solution-title">
        <div className="section-intro section-intro--compact">
          <h2 id="inventory-solution-title">Possible solution</h2>
          <p>A deterministic flow records what entered, where it moved, what was used, and what must happen next.</p>
        </div>

        <figure className="roadmap-visual operating-flow-visual">
          <div className="roadmap-image-scroll">
            <img
              src={`${basePath}/inventory-operational-flow.webp`}
              alt="Operational inventory flow from job demand and purchasing through receiving, storage, truck loading, job use, reconciliation, and outputs"
              width="1672"
              height="941"
              loading="lazy"
            />
          </div>
          <figcaption>
            <span className="roadmap-caption-summary">Inputs → material movement → operational outputs</span>
            <span className="roadmap-mobile-hint">Swipe through the full flow →</span>
            <strong>Conceptual only · Final flow confirmed during discovery</strong>
          </figcaption>
        </figure>
      </section>

      <section className="inspection-section">
        <div className="container">
          <div className="section-intro section-intro--compact">
            <h2>What we inspect</h2>
            <p>Six views of the same operation prevent a software-only diagnosis.</p>
          </div>
          <dl className="inspection-list">
            {inspectionAreas.map(([title, detail]) => (
              <div key={title}>
                <dt>{title}</dt>
                <dd>{detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="outcome-section container">
        <div className="section-intro section-intro--compact">
          <h2>Success should be visible</h2>
          <p>Before rollout, Niagara Gutter chooses the baseline and acceptance criteria.</p>
        </div>
        <div className="outcome-lines">
          <span>Physical count matches the system</span>
          <span>Material movement has an owner and history</span>
          <span>Crews can use it without slowing the job</span>
          <span>Exceptions are visible instead of silently corrected</span>
        </div>
        <div className="page-next">
          <Link href="/integration/">Next: CRM → QuickBooks pipeline →</Link>
        </div>
      </section>

      <footer className="footer container">
        <span>Project 01 · Assessment plan</span>
        <span>WNY Automation · Concept only</span>
      </footer>
    </main>
  );
}
