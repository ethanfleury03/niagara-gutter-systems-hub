import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import ProblemSection from "@/components/ProblemSection";

export const metadata: Metadata = {
  title: "CRM to QuickBooks Plan | Niagara Gutter Systems Hub",
  description: "Controlled integration plan for Leap or JobProgress and QuickBooks Online.",
};

const visuals = [
  {
    id: "integration-today-future",
    heading: "Today vs. future",
    description: "Replace repeated entry and uncertain status with one controlled, confirmed handoff.",
    src: "integration-problem-today-future.webp",
    alt: "Today versus future comparison showing manual CRM to QuickBooks entry becoming a validated and confirmed controlled flow",
    summary: "Manual handoff → controlled flow",
    mobileHint: "Swipe to compare today and future →",
    note: "Target outcome · Enter once, review exceptions, confirm every handoff",
  },
  {
    id: "integration-roadmap",
    heading: "Our roadmap",
    description: "Understand the current process before designing, testing, and piloting the automation.",
    src: "integration-roadmap.webp",
    alt: "Six-step CRM to QuickBooks roadmap: Understand, Map Ownership, Define Triggers, Design Controls, Test in Sandbox, and Pilot plus Reconcile",
    summary: "Understand → Map → Define → Design → Test → Prove",
    mobileHint: "Swipe through all six stages →",
    note: "Understand first · Automate safely · Prove the result",
  },
  {
    id: "integration-solution",
    heading: "Possible solution",
    description: "Clean records continue automatically; uncertain matches stop for human review before QuickBooks changes.",
    src: "integration-controlled-pipeline.webp",
    alt: "Possible controlled pipeline from Leap or JobProgress through validation and duplicate matching to human review or continuation, then QuickBooks Online and reconciliation",
    summary: "Validate → Match → Review uncertainty → Confirm",
    mobileHint: "Swipe through the controlled pipeline →",
    note: "Conceptual only · Exact triggers and accounting rules confirmed during discovery",
  },
];

export default function IntegrationPage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

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
          <p>Automate certain records, route uncertain records to a person, and verify every result.</p>
        </aside>
      </header>

      <ProblemSection
        id="integration-problem"
        summary="Customer and job information may be entered more than once as work moves from Leap or JobProgress into QuickBooks Online."
        items={[
          "Repeated entry can create inconsistent or duplicate customer, job, and accounting records.",
          "The owner and timing of each customer, estimate, deposit, invoice, and payment record are not yet defined.",
          "Ambiguous matches and partial failures need a safe human-review and recovery process.",
        ]}
      />

      {visuals.map((visual, index) => (
        <section
          className={`integration-visual-section${index === 1 ? " integration-visual-section--tinted" : ""}`}
          aria-labelledby={visual.id}
          key={visual.id}
        >
          <div className="container">
            <div className="section-intro section-intro--compact">
              <h2 id={visual.id}>{visual.heading}</h2>
              <p>{visual.description}</p>
            </div>
            <figure className="roadmap-visual">
              <div className="roadmap-image-scroll">
                <img
                  src={`${basePath}/${visual.src}`}
                  alt={visual.alt}
                  width="1672"
                  height="941"
                  loading="lazy"
                />
              </div>
              <figcaption>
                <span className="roadmap-caption-summary">{visual.summary}</span>
                <span className="roadmap-mobile-hint">{visual.mobileHint}</span>
                <strong>{visual.note}</strong>
              </figcaption>
            </figure>
            {index === visuals.length - 1 && (
              <div className="page-next">
                <Link href="/inventory/">← Review the inventory approach</Link>
              </div>
            )}
          </div>
        </section>
      ))}

      <footer className="footer container">
        <span>Project 03 · Integration plan</span>
        <span>WNY Automation · Concept only</span>
      </footer>
    </main>
  );
}
