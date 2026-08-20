import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "CRM to QuickBooks Plan | Niagara Gutter Systems Hub",
  description: "Controlled integration plan for Leap or JobProgress and QuickBooks Online.",
};

const controls = [
  ["Stable IDs", "Store the matching CRM and QuickBooks identifiers after the first approved link."],
  ["Idempotency", "A repeated event produces the same result instead of a duplicate transaction."],
  ["Human review", "Ambiguous customers, jobs, or amounts stop in a visible queue."],
  ["Audit history", "Every decision, payload, response, retry, and correction is traceable."],
  ["Reconciliation", "A daily view proves what synced, what failed, and what remains unresolved."],
];

const ownership = [
  ["Customer and property", "Decide during discovery", "CRM likely initiates; matching rules required"],
  ["Estimate and accepted scope", "Leap / JobProgress", "Accounting receives only the approved event"],
  ["Deposit and invoice", "QuickBooks Online", "Creation trigger and approval must be confirmed"],
  ["Payment and accounting status", "QuickBooks Online", "CRM may receive status, not overwrite books"],
  ["Integration mapping and exceptions", "Control layer", "Shared IDs, logs, review queue, retries"],
];

const scenarios = [
  {
    title: "New customer",
    state: "Straight-through",
    text: "Validated information has no credible match. Create the approved accounting record, store both IDs, and confirm the handoff.",
  },
  {
    title: "Possible duplicate",
    state: "Human decision",
    text: "Name, phone, email, or property partly match. Stop before writing and ask an authorized employee to link or create.",
  },
  {
    title: "Partial failure",
    state: "Safe recovery",
    text: "A customer was created but the invoice failed. Preserve the successful ID, log the error, and retry only the missing step.",
  },
];

export default function IntegrationPage() {
  return (
    <main className="site-shell workstream-page">
      <SiteNav />

      <header className="subpage-hero subpage-hero--integration container">
        <div>
          <Link className="back-link" href="/">← Systems hub</Link>
          <p className="context-line">Project 03 · Controlled accounting handoff</p>
          <h1>Move approved data once.<br />Prove where it went.</h1>
        </div>
        <aside className="hero-brief">
          <span>Brad’s outcome</span>
          <strong>Eliminate duplicate entry without weakening accounting controls.</strong>
          <p>This is not just deduplication. It is ownership, timing, matching, approvals, recovery, and reconciliation.</p>
        </aside>
      </header>

      <section className="pipeline-section" aria-labelledby="pipeline-title">
        <div className="container">
          <div className="section-intro section-intro--compact section-intro--light">
            <h2 id="pipeline-title">The controlled pipeline</h2>
            <p>Every record crosses explicit gates before QuickBooks is changed.</p>
          </div>

          <div className="pipeline" aria-label="Conceptual CRM to QuickBooks integration pipeline">
            <div className="pipeline-node"><span>Source</span><strong>Leap / JobProgress</strong><small>Customer · property · accepted job</small></div>
            <div className="pipeline-arrow" aria-hidden="true">→</div>
            <div className="pipeline-node"><span>Gate 1</span><strong>Validate</strong><small>Required fields · status · amount · tax</small></div>
            <div className="pipeline-arrow" aria-hidden="true">→</div>
            <div className="pipeline-node pipeline-node--decision"><span>Gate 2</span><strong>Match identity</strong><small>Existing customer or job?</small></div>
            <div className="pipeline-arrow" aria-hidden="true">→</div>
            <div className="pipeline-node"><span>Write</span><strong>QuickBooks Online</strong><small>Approved customer · project · transaction</small></div>
            <div className="pipeline-arrow" aria-hidden="true">→</div>
            <div className="pipeline-node"><span>Proof</span><strong>Reconcile</strong><small>IDs · result · exception · owner</small></div>
            <div className="review-branch">
              <span>Uncertain match or control exception</span>
              <strong>Human review queue</strong>
              <small>Resolve · approve · resume</small>
            </div>
          </div>
          <p className="diagram-note diagram-note--dark">Conceptual pipeline · Exact product editions, APIs, triggers, and accounting objects require system access and bookkeeper approval.</p>
        </div>
      </section>

      <section className="control-section container">
        <div className="section-intro section-intro--compact">
          <h2>Controls built into the flow</h2>
          <p>The integration should fail visibly and safely—not silently guess.</p>
        </div>
        <dl className="control-list">
          {controls.map(([title, detail], index) => (
            <div key={title}>
              <dt><span>{String(index + 1).padStart(2, "0")}</span>{title}</dt>
              <dd>{detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="ownership-section">
        <div className="container">
          <div className="section-intro section-intro--compact">
            <h2>Who owns each record?</h2>
            <p>The first discovery decision is authority—not technology.</p>
          </div>
          <div className="ownership-table" role="table" aria-label="Preliminary system ownership matrix">
            <div className="ownership-row ownership-row--head" role="row">
              <span role="columnheader">Object</span><span role="columnheader">Candidate owner</span><span role="columnheader">Rule to confirm</span>
            </div>
            {ownership.map(([object, owner, rule]) => (
              <div className="ownership-row" role="row" key={object}>
                <strong role="cell">{object}</strong><span role="cell">{owner}</span><span role="cell">{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="scenario-section container">
        <div className="section-intro section-intro--compact">
          <h2>Three paths the system must handle</h2>
          <p>A reliable integration is designed around exceptions, not just the happy path.</p>
        </div>
        <div className="scenario-layout">
          {scenarios.map((scenario, index) => (
            <article className={index === 1 ? "scenario scenario--wide" : "scenario"} key={scenario.title}>
              <span>{scenario.state}</span>
              <h3>{scenario.title}</h3>
              <p>{scenario.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="implementation-section">
        <div className="container implementation-grid">
          <div>
            <p className="context-line context-line--light">Implementation sequence</p>
            <h2>Map → Sandbox → Pilot → Monitor</h2>
          </div>
          <ol>
            <li><strong>Map</strong><span>Walk through real examples and assign ownership.</span></li>
            <li><strong>Sandbox</strong><span>Test synthetic and anonymized scenarios without touching live books.</span></li>
            <li><strong>Pilot</strong><span>Release one approved transaction path to a small group.</span></li>
            <li><strong>Monitor</strong><span>Reconcile daily, measure exceptions, and expand only when stable.</span></li>
          </ol>
        </div>
      </section>

      <section className="outcome-section container">
        <div className="section-intro section-intro--compact">
          <h2>What Brad gets</h2>
          <p>A controlled handoff that removes repetitive entry while keeping humans responsible for accounting decisions.</p>
        </div>
        <div className="outcome-lines">
          <span>One approved trigger for each accounting action</span>
          <span>No duplicate creation from retries</span>
          <span>Visible exception ownership</span>
          <span>Daily reconciliation evidence</span>
        </div>
        <div className="page-next">
          <Link href="/inventory/">← Review the inventory approach</Link>
        </div>
      </section>

      <footer className="footer container">
        <span>Project 03 · Integration plan</span>
        <span>WNY Automation · Concept only</span>
      </footer>
    </main>
  );
}
