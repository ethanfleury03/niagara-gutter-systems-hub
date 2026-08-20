"use client";

import { useRef, useState, type KeyboardEvent } from "react";

type TabId = "calculator" | "values";

type ValueRow = {
  id: string;
  item: string;
  unit: string;
  prefix?: string;
  suffix?: string;
  value: number;
};

const tabs: { id: TabId; label: string }[] = [
  { id: "calculator", label: "Calculator" },
  { id: "values", label: "Values" },
];

const syntheticValues: ValueRow[] = [
  { id: "gutter", item: "Standard gutter", unit: "Per foot", prefix: "$", value: 12 },
  { id: "guard", item: "Gutter guard", unit: "Per foot", prefix: "$", value: 18 },
  { id: "downspout", item: "Downspout", unit: "Each", prefix: "$", value: 95 },
  { id: "removal", item: "Existing gutter removal", unit: "Per foot", prefix: "$", value: 2 },
  { id: "second-story", item: "Second-story adjustment", unit: "Percentage", suffix: "%", value: 15 },
  { id: "access", item: "Difficult access", unit: "Fixed amount", prefix: "$", value: 150 },
  { id: "minimum", item: "Minimum job price", unit: "Minimum", prefix: "$", value: 750 },
  { id: "discount", item: "Maximum discount", unit: "Percentage", suffix: "%", value: 10 },
];

function CalculatorPanel() {
  return (
    <div className="calculator-layout">
      <form className="calculator-form" aria-label="Calculator design preview">
        <div className="calculator-panel-heading">
          <span>Job details</span>
          <small>Enter a sample project</small>
        </div>
        <div className="calculator-fields">
          <label>
            <span>Product type</span>
            <select defaultValue="">
              <option value="" disabled>Select a product</option>
              <option>Gutters</option>
              <option>Gutter guards</option>
              <option>Gutters + guards</option>
            </select>
          </label>
          <label>
            <span>Linear feet</span>
            <input type="number" min="0" placeholder="0" inputMode="decimal" />
          </label>
          <label>
            <span>Number of stories</span>
            <select defaultValue="1">
              <option value="1">One story</option>
              <option value="2">Two stories</option>
              <option value="3">Three or more</option>
            </select>
          </label>
          <label>
            <span>Downspouts</span>
            <input type="number" min="0" placeholder="0" inputMode="numeric" />
          </label>
          <label>
            <span>Access difficulty</span>
            <select defaultValue="standard">
              <option value="standard">Standard</option>
              <option value="difficult">Difficult access</option>
            </select>
          </label>
          <label>
            <span>Discount</span>
            <span className="calculator-input-affix"><input type="number" min="0" placeholder="0" inputMode="decimal" /><b>%</b></span>
          </label>
        </div>
        <div className="calculator-checks">
          <label><input type="checkbox" /> Remove existing gutters</label>
          <label><input type="checkbox" /> Include gutter guards</label>
        </div>
      </form>

      <aside className="calculator-result" aria-label="Estimated price design preview">
        <div className="calculator-panel-heading calculator-panel-heading--light">
          <span>Estimated price</span>
          <small>Calculation logic next</small>
        </div>
        <dl className="calculator-price-lines">
          <div><dt>Base price</dt><dd>$—</dd></div>
          <div><dt>Add-ons</dt><dd>$—</dd></div>
          <div><dt>Adjustments</dt><dd>$—</dd></div>
          <div><dt>Discount</dt><dd>− $—</dd></div>
        </dl>
        <div className="calculator-total"><span>Estimated total</span><strong>$—</strong></div>
        <div className="calculator-explanation">
          <span>Why this price</span>
          <p>An itemized explanation will appear here once the pricing rules are connected.</p>
        </div>
      </aside>
    </div>
  );
}

function ValuesPanel() {
  return (
    <div className="values-panel">
      <div className="values-intro">
        <div><span>Pricing values</span><strong>Synthetic configuration</strong></div>
        <p>These example amounts will control every calculator result once the calculation logic is connected.</p>
      </div>
      <div className="values-table" role="table" aria-label="Synthetic pricing values">
        <div className="values-row values-row--head" role="row">
          <span role="columnheader">Item</span><span role="columnheader">Unit</span><span role="columnheader">Assigned value</span>
        </div>
        {syntheticValues.map((row) => (
          <div className="values-row" role="row" key={row.id}>
            <strong role="cell">{row.item}</strong>
            <span role="cell">{row.unit}</span>
            <label role="cell" aria-label={`${row.item} value`}>
              {row.prefix && <b>{row.prefix}</b>}
              <input type="number" min="0" defaultValue={row.value} inputMode="decimal" />
              {row.suffix && <b>{row.suffix}</b>}
            </label>
          </div>
        ))}
      </div>
      <div className="values-actions">
        <button type="button" disabled>Reset demo values</button>
        <button type="button" className="values-apply" disabled>Apply changes · Logic next</button>
      </div>
    </div>
  );
}

export function PricingCalculatorConcept() {
  const [activeTab, setActiveTab] = useState<TabId>("calculator");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function selectTab(index: number) {
    const next = tabs[index];
    setActiveTab(next.id);
    tabRefs.current[index]?.focus();
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === "ArrowRight") { event.preventDefault(); selectTab((index + 1) % tabs.length); }
    if (event.key === "ArrowLeft") { event.preventDefault(); selectTab((index - 1 + tabs.length) % tabs.length); }
    if (event.key === "Home") { event.preventDefault(); selectTab(0); }
    if (event.key === "End") { event.preventDefault(); selectTab(tabs.length - 1); }
  }

  return (
    <div className="calculator-shell">
      <div className="calculator-shell-head">
        <div><span>Design prototype</span><strong>Pricing workspace</strong></div>
        <p>Calculations inactive · Synthetic values only</p>
      </div>
      <div className="calculator-tabs" role="tablist" aria-label="Pricing workspace views">
        {tabs.map((tab, index) => (
          <button
            id={`${tab.id}-tab`}
            className={activeTab === tab.id ? "calculator-tab calculator-tab--active" : "calculator-tab"}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${tab.id}-panel`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
            ref={(element) => { tabRefs.current[index] = element; }}
            key={tab.id}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>{tab.label}
          </button>
        ))}
      </div>
      <div id={`${activeTab}-panel`} role="tabpanel" aria-labelledby={`${activeTab}-tab`}>
        {activeTab === "calculator" ? <CalculatorPanel /> : <ValuesPanel />}
      </div>
    </div>
  );
}
