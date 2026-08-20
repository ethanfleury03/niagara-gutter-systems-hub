type ProblemSectionProps = {
  id: string;
  summary: string;
  items: string[];
};

export default function ProblemSection({ id, summary, items }: ProblemSectionProps) {
  return (
    <section className="problem-section" aria-labelledby={id}>
      <div className="container problem-grid">
        <div>
          <p className="context-line">Current understanding</p>
          <h2 id={id}>Problem</h2>
        </div>
        <div className="problem-copy">
          <p>{summary}</p>
          <ul>
            {items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
