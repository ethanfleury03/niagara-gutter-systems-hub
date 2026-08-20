const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const workstreams = [
  {
    number: "01",
    title: "Inventory application",
    status: "Review first",
    summary: "Understand the current application, physical workflow, and ownership before recommending changes.",
    next: "Existing-system assessment",
  },
  {
    number: "02",
    title: "Pricing calculator",
    status: "Build next",
    summary: "Turn Brad’s pricing knowledge into a controlled, explainable model for the sales team.",
    next: "Interactive concept",
  },
  {
    number: "03",
    title: "CRM → QuickBooks",
    status: "Map next",
    summary: "Move approved customer and job data once, preserve accounting controls, and route exceptions to people.",
    next: "Integration flow",
  },
];

export default function Home() {
  return (
    <main className="site-shell" id="top">
      <nav className="nav-pill" aria-label="Primary navigation">
        <a className="nav-wordmark" href="#top">NG Systems</a>
        <div className="nav-links">
          <a href="#workstreams">Workstreams</a>
          <a href="#operating-layer">AI layer</a>
        </div>
        <span className="nav-state">Concept</span>
      </nav>

      <header className="hero container">
        <div className="hero-copy reveal" style={{ "--i": 0 } as React.CSSProperties}>
          <p className="context-line">Prepared for Niagara Gutter by WNY Automation</p>
          <h1>Three systems.<br />One operating layer.</h1>
          <p className="hero-lede">
            A private presentation shell for exploring inventory, pricing, and accounting workflows before production decisions are made.
          </p>
        </div>

        <figure className="brand-panel reveal" style={{ "--i": 1 } as React.CSSProperties}>
          <img
            src={`${basePath}/niagara-gutter-logo.webp`}
            alt="Niagara Gutter — family owned and operated since 1962"
            width="690"
            height="288"
            fetchPriority="high"
          />
          <figcaption>
            <span>Presentation state</span>
            <strong>Foundation ready</strong>
          </figcaption>
        </figure>
      </header>

      <section className="workstreams container" id="workstreams" aria-labelledby="workstreams-title">
        <div className="section-intro">
          <h2 id="workstreams-title">Workstreams</h2>
          <p>Each area will expand only after the current process, owners, and success criteria are understood.</p>
        </div>

        <div className="workstream-list">
          {workstreams.map((item, index) => (
            <article className="workstream reveal" style={{ "--i": index + 2 } as React.CSSProperties} key={item.number}>
              <div className="workstream-number" aria-hidden="true">{item.number}</div>
              <div className="workstream-main">
                <div className="workstream-title-row">
                  <h3>{item.title}</h3>
                  <span className="status-chip">{item.status}</span>
                </div>
                <p>{item.summary}</p>
              </div>
              <div className="workstream-next">
                <span>Next artifact</span>
                <strong>{item.next}</strong>
              </div>
              <button className="workstream-action" type="button" disabled aria-disabled="true">
                Coming next
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="operating-layer" id="operating-layer">
        <div className="container operating-grid">
          <div>
            <p className="context-line context-line--light">Shared interface</p>
            <h2>Hermes connects the work without replacing the controls.</h2>
          </div>
          <div className="command-list" aria-label="Future Hermes capabilities">
            <span>Check inventory</span>
            <span>Price a job</span>
            <span>Review exceptions</span>
            <span>Explain a result</span>
          </div>
        </div>
      </section>

      <footer className="footer container">
        <span>Private concept · Synthetic data only</span>
        <span>WNY Automation · August 2026</span>
      </footer>
    </main>
  );
}
