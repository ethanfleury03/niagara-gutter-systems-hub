"use client";

import { useRef, useState, type KeyboardEvent } from "react";

type TabId = "calculator" | "values";
type Product = "" | "gutters" | "guards" | "gutters-guards";
type Access = "standard" | "difficult";
type PricingKey = keyof PricingValues;

type PricingValues = {
  gutterPerFoot: number;
  guardPerFoot: number;
  downspoutEach: number;
  removalPerFoot: number;
  additionalStoryPercent: number;
  difficultAccess: number;
  minimumJob: number;
  maximumDiscountPercent: number;
};

type JobInputs = {
  product: Product;
  linearFeet: number;
  stories: 1 | 2 | 3;
  downspouts: number;
  access: Access;
  discountPercent: number;
  removal: boolean;
  includeGuards: boolean;
};

const tabs: { id: TabId; label: string }[] = [
  { id: "calculator", label: "Calculator" },
  { id: "values", label: "Values" },
];

const defaultPricingValues: PricingValues = {
  gutterPerFoot: 12,
  guardPerFoot: 18,
  downspoutEach: 95,
  removalPerFoot: 2,
  additionalStoryPercent: 15,
  difficultAccess: 150,
  minimumJob: 750,
  maximumDiscountPercent: 10,
};

const defaultJobInputs: JobInputs = {
  product: "",
  linearFeet: 0,
  stories: 1,
  downspouts: 0,
  access: "standard",
  discountPercent: 0,
  removal: false,
  includeGuards: false,
};

const valueRows: Array<{ key: PricingKey; item: string; unit: string; prefix?: string; suffix?: string }> = [
  { key: "gutterPerFoot", item: "Standard gutter", unit: "Per foot", prefix: "$" },
  { key: "guardPerFoot", item: "Gutter guard", unit: "Per foot", prefix: "$" },
  { key: "downspoutEach", item: "Downspout", unit: "Each", prefix: "$" },
  { key: "removalPerFoot", item: "Existing gutter removal", unit: "Per foot", prefix: "$" },
  { key: "additionalStoryPercent", item: "Additional-story adjustment", unit: "Per additional story", suffix: "%" },
  { key: "difficultAccess", item: "Difficult access", unit: "Fixed amount", prefix: "$" },
  { key: "minimumJob", item: "Minimum job price", unit: "Minimum", prefix: "$" },
  { key: "maximumDiscountPercent", item: "Maximum discount", unit: "Percentage", suffix: "%" },
];

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function calculatePrice(job: JobInputs, values: PricingValues) {
  const feet = Math.max(0, job.linearFeet);
  const downspouts = Math.max(0, job.downspouts);
  const hasJob = job.product !== "" && feet > 0;
  const productIncludesGuards = job.product === "guards" || job.product === "gutters-guards";

  let basePrice = 0;
  const explanation: string[] = [];
  if (job.product === "gutters") {
    basePrice = feet * values.gutterPerFoot;
    explanation.push(`${feet} ft of gutter × ${currency.format(values.gutterPerFoot)}`);
  }
  if (job.product === "guards") {
    basePrice = feet * values.guardPerFoot;
    explanation.push(`${feet} ft of gutter guard × ${currency.format(values.guardPerFoot)}`);
  }
  if (job.product === "gutters-guards") {
    basePrice = feet * (values.gutterPerFoot + values.guardPerFoot);
    explanation.push(`${feet} ft of gutter + guard`);
  }

  const downspoutPrice = downspouts * values.downspoutEach;
  const removalPrice = job.removal ? feet * values.removalPerFoot : 0;
  const guardAddOn = job.includeGuards && !productIncludesGuards ? feet * values.guardPerFoot : 0;
  const addOns = downspoutPrice + removalPrice + guardAddOn;
  if (downspouts > 0) explanation.push(`${downspouts} downspouts × ${currency.format(values.downspoutEach)}`);
  if (removalPrice > 0) explanation.push(`Existing gutter removal × ${feet} ft`);
  if (guardAddOn > 0) explanation.push(`Gutter guard add-on × ${feet} ft`);

  const additionalStories = Math.max(0, job.stories - 1);
  const storyPercent = additionalStories * values.additionalStoryPercent;
  const storyAdjustment = (basePrice + addOns) * (storyPercent / 100);
  const accessAdjustment = job.access === "difficult" ? values.difficultAccess : 0;
  const adjustments = storyAdjustment + accessAdjustment;
  if (storyPercent > 0) explanation.push(`${storyPercent}% additional-story adjustment`);
  if (accessAdjustment > 0) explanation.push(`${currency.format(accessAdjustment)} difficult-access adjustment`);

  const requestedDiscount = Math.max(0, job.discountPercent);
  const appliedDiscountPercent = Math.min(requestedDiscount, values.maximumDiscountPercent);
  const preDiscount = basePrice + addOns + adjustments;
  const discount = preDiscount * (appliedDiscountPercent / 100);
  const calculatedTotal = Math.max(0, preDiscount - discount);
  const total = hasJob ? Math.max(values.minimumJob, calculatedTotal) : 0;
  if (appliedDiscountPercent > 0) explanation.push(`${appliedDiscountPercent}% discount applied`);
  if (hasJob && total === values.minimumJob && calculatedTotal < values.minimumJob) {
    explanation.push(`${currency.format(values.minimumJob)} minimum job price applied`);
  }

  return {
    hasJob,
    basePrice,
    addOns,
    adjustments,
    discount,
    total,
    explanation,
    discountLimited: requestedDiscount > values.maximumDiscountPercent,
    appliedDiscountPercent,
    productIncludesGuards,
  };
}

function CalculatorPanel({
  job,
  values,
  onChange,
}: {
  job: JobInputs;
  values: PricingValues;
  onChange: (change: Partial<JobInputs>) => void;
}) {
  const result = calculatePrice(job, values);
  const guardsChecked = result.productIncludesGuards || job.includeGuards;

  return (
    <div className="calculator-layout">
      <form className="calculator-form" aria-label="Synthetic pricing calculator">
        <div className="calculator-panel-heading">
          <span>Job details</span><small>Enter a sample project</small>
        </div>
        <div className="calculator-fields">
          <label><span>Product type</span><select value={job.product} onChange={(event) => onChange({ product: event.target.value as Product })}><option value="" disabled>Select a product</option><option value="gutters">Gutters</option><option value="guards">Gutter guards only</option><option value="gutters-guards">Gutters + guards</option></select></label>
          <label><span>Linear feet</span><input type="number" min="0" value={job.linearFeet} onChange={(event) => onChange({ linearFeet: Math.max(0, Number(event.target.value)) })} inputMode="decimal" /></label>
          <label><span>Number of stories</span><select value={job.stories} onChange={(event) => onChange({ stories: Number(event.target.value) as 1 | 2 | 3 })}><option value="1">One story</option><option value="2">Two stories</option><option value="3">Three stories</option></select></label>
          <label><span>Downspouts</span><input type="number" min="0" value={job.downspouts} onChange={(event) => onChange({ downspouts: Math.max(0, Number(event.target.value)) })} inputMode="numeric" /></label>
          <label><span>Access difficulty</span><select value={job.access} onChange={(event) => onChange({ access: event.target.value as Access })}><option value="standard">Standard</option><option value="difficult">Difficult access</option></select></label>
          <label><span>Discount</span><span className="calculator-input-affix"><input type="number" min="0" value={job.discountPercent} onChange={(event) => onChange({ discountPercent: Math.max(0, Number(event.target.value)) })} inputMode="decimal" /><b>%</b></span></label>
        </div>
        <div className="calculator-checks">
          <label><input type="checkbox" checked={job.removal} onChange={(event) => onChange({ removal: event.target.checked })} /> Remove existing gutters</label>
          <label className={result.productIncludesGuards ? "calculator-check--locked" : ""}><input type="checkbox" checked={guardsChecked} disabled={result.productIncludesGuards} onChange={(event) => onChange({ includeGuards: event.target.checked })} /> Include gutter guards</label>
        </div>
        {result.discountLimited && <p className="calculator-limit-note">Discount limited to the configured maximum of {values.maximumDiscountPercent}%.</p>}
      </form>

      <aside className="calculator-result" aria-live="polite" aria-label="Estimated synthetic price">
        <div className="calculator-panel-heading calculator-panel-heading--light"><span>Estimated price</span><small>Updates instantly</small></div>
        <dl className="calculator-price-lines">
          <div><dt>Base price</dt><dd>{currency.format(result.basePrice)}</dd></div>
          <div><dt>Add-ons</dt><dd>{currency.format(result.addOns)}</dd></div>
          <div><dt>Adjustments</dt><dd>{currency.format(result.adjustments)}</dd></div>
          <div><dt>Discount ({result.appliedDiscountPercent}%)</dt><dd>− {currency.format(result.discount)}</dd></div>
        </dl>
        <div className="calculator-total"><span>Estimated total</span><strong>{currency.format(result.total)}</strong></div>
        <div className="calculator-explanation">
          <span>Why this price</span>
          {result.hasJob ? <ul>{result.explanation.map((line) => <li key={line}>{line}</li>)}</ul> : <p>Select a product and enter linear feet to calculate a synthetic estimate.</p>}
        </div>
      </aside>
    </div>
  );
}

function ValuesPanel({ values, onChange, onReset }: { values: PricingValues; onChange: (key: PricingKey, value: number) => void; onReset: () => void }) {
  return (
    <div className="values-panel">
      <div className="values-intro"><div><span>Pricing values</span><strong>Synthetic configuration</strong></div><p>Changes apply instantly to the Calculator tab. These are example amounts—not Niagara Gutter’s real pricing rules.</p></div>
      <div className="values-table" role="table" aria-label="Synthetic pricing values">
        <div className="values-row values-row--head" role="row"><span role="columnheader">Item</span><span role="columnheader">Unit</span><span role="columnheader">Assigned value</span></div>
        {valueRows.map((row) => (
          <div className="values-row" role="row" key={row.key}>
            <strong role="cell">{row.item}</strong><span role="cell">{row.unit}</span>
            <label role="cell" aria-label={`${row.item} value`} className={`value-input${row.prefix ? " value-input--prefix" : ""}${row.suffix ? " value-input--suffix" : ""}`}>
              {row.prefix && <b className="value-affix value-affix--prefix">{row.prefix}</b>}
              <input type="number" min="0" value={values[row.key]} onChange={(event) => onChange(row.key, Math.max(0, Number(event.target.value)))} inputMode="decimal" />
              {row.suffix && <b className="value-affix value-affix--suffix">{row.suffix}</b>}
            </label>
          </div>
        ))}
      </div>
      <div className="values-actions"><span>Values update instantly</span><button type="button" onClick={onReset}>Reset demo values</button></div>
    </div>
  );
}

export function PricingCalculatorConcept() {
  const [activeTab, setActiveTab] = useState<TabId>("calculator");
  const [job, setJob] = useState<JobInputs>(defaultJobInputs);
  const [values, setValues] = useState<PricingValues>(defaultPricingValues);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function selectTab(index: number) { const next = tabs[index]; setActiveTab(next.id); tabRefs.current[index]?.focus(); }
  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === "ArrowRight") { event.preventDefault(); selectTab((index + 1) % tabs.length); }
    if (event.key === "ArrowLeft") { event.preventDefault(); selectTab((index - 1 + tabs.length) % tabs.length); }
    if (event.key === "Home") { event.preventDefault(); selectTab(0); }
    if (event.key === "End") { event.preventDefault(); selectTab(tabs.length - 1); }
  }

  return (
    <div className="calculator-shell">
      <div className="calculator-shell-head"><div><span>Interactive prototype</span><strong>Pricing workspace</strong></div><p>Live synthetic calculation · Edit values anytime</p></div>
      <div className="calculator-tabs" role="tablist" aria-label="Pricing workspace views">
        {tabs.map((tab, index) => <button id={`${tab.id}-tab`} className={activeTab === tab.id ? "calculator-tab calculator-tab--active" : "calculator-tab"} type="button" role="tab" aria-selected={activeTab === tab.id} aria-controls={`${tab.id}-panel`} tabIndex={activeTab === tab.id ? 0 : -1} onClick={() => setActiveTab(tab.id)} onKeyDown={(event) => handleTabKeyDown(event, index)} ref={(element) => { tabRefs.current[index] = element; }} key={tab.id}><span>{String(index + 1).padStart(2, "0")}</span>{tab.label}</button>)}
      </div>
      <div id={`${activeTab}-panel`} role="tabpanel" aria-labelledby={`${activeTab}-tab`}>
        {activeTab === "calculator" ? <CalculatorPanel job={job} values={values} onChange={(change) => setJob((current) => ({ ...current, ...change }))} /> : <ValuesPanel values={values} onChange={(key, value) => setValues((current) => ({ ...current, [key]: value }))} onReset={() => setValues(defaultPricingValues)} />}
      </div>
    </div>
  );
}
