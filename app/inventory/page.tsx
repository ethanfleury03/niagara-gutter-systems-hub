import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Inventory Application Plan | Niagara Gutter Systems Hub",
  description: "Assessment and implementation approach for Niagara Gutter’s existing inventory application.",
};

const phases = [
  {
    number: "01",
    title: "Inspect the application",
    detail: "Review the live app, code ownership, hosting, database, users, existing features, bugs, and current backlog.",
    output: "Technical assessment",
  },
  {
    number: "02",
    title: "Observe the physical flow",
    detail: "Follow material from purchase and receiving through warehouse storage, truck loading, job use, return, and scrap.",
    output: "Current-state workflow",
  },
  {
    number: "03",
    title: "Define the source of truth",
    detail: "Agree on locations, items, units, transaction types, permissions, and what must connect to jobs or accounting.",
    output: "Approved data model",
  },
  {
    number: "04",
    title: "Stabilize the highest-value path",
    detail: "Fix the smallest complete workflow first—typically receive, locate, issue, return, and audit material.",
    output: "Controlled pilot",
  },
  {
    number: "05",
    title: "Roll out with evidence",
    detail: "Train a small user group, compare app records with physical counts, resolve friction, then expand deliberately.",
    output: "Production decision",
  },
];

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

      <section className="map-section container" aria-labelledby="inventory-map-title">
        <div className="section-intro section-intro--compact">
          <h2 id="inventory-map-title">The operating map</h2>
          <p>The application should reflect where material physically moves, not force employees into an abstract software model.</p>
        </div>

        <div className="inventory-map" aria-label="Conceptual inventory operating map">
          <div className="map-node map-node--top"><span>Purchasing</span><strong>Orders and cost</strong></div>
          <div className="map-node map-node--left"><span>Warehouse</span><strong>Receive and locate</strong></div>
          <div className="map-core"><small>Existing application</small><strong>Inventory ledger</strong><span>One history of every material movement</span></div>
          <div className="map-node map-node--right"><span>Trucks</span><strong>Load and return</strong></div>
          <div className="map-node map-node--bottom"><span>Jobs</span><strong>Reserve, use, and reconcile</strong></div>
          <div className="map-connector map-connector--vertical" aria-hidden="true" />
          <div className="map-connector map-connector--horizontal" aria-hidden="true" />
        </div>
        <p className="diagram-note">Conceptual structure only · Actual locations, items, and workflows must be confirmed onsite.</p>
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

      <section className="phase-section container" aria-labelledby="inventory-phases-title">
        <div className="section-intro section-intro--compact">
          <h2 id="inventory-phases-title">How we attack it</h2>
          <p>Each phase produces a decision artifact before more software is added.</p>
        </div>
        <ol className="phase-track">
          {phases.map((phase) => (
            <li key={phase.number}>
              <span className="phase-number">{phase.number}</span>
              <div><h3>{phase.title}</h3><p>{phase.detail}</p></div>
              <strong>{phase.output}</strong>
            </li>
          ))}
        </ol>
      </section>

      <section className="decision-section">
        <div className="container decision-grid">
          <div>
            <p className="context-line context-line--light">Decision gate</p>
            <h2>Three possible outcomes.<br />No predetermined answer.</h2>
          </div>
          <div className="decision-options">
            <article><strong>Finish</strong><p>The foundation works; complete missing workflows and harden operations.</p></article>
            <article><strong>Refactor</strong><p>The product is useful, but selected architecture or UX needs targeted repair.</p></article>
            <article><strong>Rebuild</strong><p>Only if ownership, reliability, security, or maintainability makes recovery unreasonable.</p></article>
          </div>
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
