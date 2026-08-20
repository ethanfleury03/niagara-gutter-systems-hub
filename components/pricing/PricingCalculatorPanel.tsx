"use client";

import { useState } from "react";
import {
  calculateQuote,
  currency,
  type PricingValues,
  type QuoteInputs,
} from "./pricingModel";

const steps = [
  { id: "project", label: "Project" },
  { id: "measurements", label: "Measurements" },
  { id: "conditions", label: "Conditions" },
  { id: "pricing", label: "Pricing" },
] as const;

function NumberField({ label, value, onChange, hint }: { label: string; value: number; onChange: (value: number) => void; hint?: string }) {
  return (
    <label>
      <span>{label}</span>
      <input type="number" min="0" value={value} onChange={(event) => onChange(Math.max(0, Number(event.target.value)))} inputMode="decimal" />
      {hint && <small>{hint}</small>}
    </label>
  );
}

function ProjectStep({ quote, update }: StepProps) {
  return (
    <div className="quote-step-fields">
      <label><span>Job type</span><select value={quote.jobType} onChange={(event) => update({ jobType: event.target.value as QuoteInputs["jobType"] })}><option value="new">New installation</option><option value="replacement">Gutter replacement</option><option value="guards">Gutter guards only</option><option value="repair">Repair / service</option></select></label>
      <label><span>Property type</span><select value={quote.propertyType} onChange={(event) => update({ propertyType: event.target.value as QuoteInputs["propertyType"] })}><option value="residential">Residential</option><option value="commercial">Commercial</option></select></label>
      <label><span>Travel zone</span><select value={quote.travelZone} onChange={(event) => update({ travelZone: event.target.value as QuoteInputs["travelZone"] })}><option value="local">Local service area</option><option value="extended">Extended travel</option><option value="outside">Outside service area</option></select></label>
      <label><span>Project label</span><input type="text" value={quote.projectLabel} onChange={(event) => update({ projectLabel: event.target.value })} placeholder="Example: Smith residence" /></label>
    </div>
  );
}

function MeasurementsStep({ quote, update }: StepProps) {
  const gutterJob = quote.jobType === "new" || quote.jobType === "replacement";
  return (
    <div className="quote-step-fields quote-step-fields--measurements">
      {gutterJob && <label><span>Gutter size</span><select value={quote.gutterSize} onChange={(event) => update({ gutterSize: event.target.value as QuoteInputs["gutterSize"] })}><option value="5">5-inch gutter</option><option value="6">6-inch gutter</option></select></label>}
      {gutterJob && <NumberField label="Gutter linear feet" value={quote.gutterFeet} onChange={(gutterFeet) => update({ gutterFeet })} />}
      <NumberField label="Gutter-guard linear feet" value={quote.guardFeet} onChange={(guardFeet) => update({ guardFeet })} />
      <NumberField label="Downspouts" value={quote.downspouts} onChange={(downspouts) => update({ downspouts })} />
      <NumberField label="Corners" value={quote.corners} onChange={(corners) => update({ corners })} />
      <NumberField label="Outlets" value={quote.outlets} onChange={(outlets) => update({ outlets })} />
      <NumberField label="End caps" value={quote.endCaps} onChange={(endCaps) => update({ endCaps })} />
      <NumberField label="Downspout extensions" value={quote.extensions} onChange={(extensions) => update({ extensions })} />
    </div>
  );
}

function ConditionsStep({ quote, update }: StepProps) {
  return (
    <div>
      <div className="quote-step-fields">
        <label><span>Number of stories</span><select value={quote.stories} onChange={(event) => update({ stories: Number(event.target.value) as QuoteInputs["stories"] })}><option value="1">One story</option><option value="2">Two stories</option><option value="3">Three stories</option></select></label>
        <label><span>Roof pitch</span><select value={quote.roofPitch} onChange={(event) => update({ roofPitch: event.target.value as QuoteInputs["roofPitch"] })}><option value="standard">Standard</option><option value="steep">Steep roof</option></select></label>
        <label><span>Site access</span><select value={quote.access} onChange={(event) => update({ access: event.target.value as QuoteInputs["access"] })}><option value="standard">Standard access</option><option value="difficult">Difficult access</option></select></label>
        <label><span>Equipment</span><select value={quote.equipment} onChange={(event) => update({ equipment: event.target.value as QuoteInputs["equipment"] })}><option value="none">Standard equipment</option><option value="lift">Lift / special equipment</option></select></label>
        <NumberField label="Fascia allowance (feet)" value={quote.fasciaFeet} onChange={(fasciaFeet) => update({ fasciaFeet })} hint="Confirm actual scope onsite" />
        <NumberField label="Additional labor hours" value={quote.additionalLaborHours} onChange={(additionalLaborHours) => update({ additionalLaborHours })} />
      </div>
      <div className="quote-toggle-grid">
        <label><input type="checkbox" checked={quote.removeExisting} onChange={(event) => update({ removeExisting: event.target.checked })} /> <span><strong>Remove existing gutters</strong><small>Uses measured gutter feet</small></span></label>
      </div>
    </div>
  );
}

function PricingStep({ quote, values, update }: StepProps & { values: PricingValues }) {
  return (
    <div>
      <div className="quote-step-fields">
        <NumberField label="Condition allowance" value={quote.contingencyPercent} onChange={(contingencyPercent) => update({ contingencyPercent })} hint={`Suggested synthetic value: ${values.defaultContingencyPercent}%`} />
        <NumberField label="Sales discount" value={quote.discountPercent} onChange={(discountPercent) => update({ discountPercent })} hint={`Maximum configured: ${values.maximumDiscountPercent}%`} />
      </div>
      <div className="quote-toggle-grid">
        <label><input type="checkbox" checked={quote.applyTax} onChange={(event) => update({ applyTax: event.target.checked })} /> <span><strong>Apply configured tax</strong><small>Rate must be confirmed before production use</small></span></label>
      </div>
      <label className="quote-notes"><span>Estimator notes</span><textarea value={quote.notes} onChange={(event) => update({ notes: event.target.value })} placeholder="Scope assumptions, customer requests, or approval notes…" rows={4} /></label>
    </div>
  );
}

type StepProps = { quote: QuoteInputs; update: (change: Partial<QuoteInputs>) => void };

function EstimateSummary({ quote, values }: { quote: QuoteInputs; values: PricingValues }) {
  const result = calculateQuote(quote, values);
  const status = !result.hasWork ? "Incomplete" : result.flags.length > 0 ? "Review" : "Ready";
  return (
    <aside className="calculator-result quote-summary" aria-live="polite" aria-label="Synthetic estimate summary">
      <div className="quote-summary-head">
        <div><span>Live estimate</span><strong>{quote.projectLabel || "Untitled project"}</strong></div>
        <b className={status === "Review" ? "quote-status quote-status--review" : status === "Incomplete" ? "quote-status quote-status--incomplete" : "quote-status"}>{status}</b>
      </div>
      <dl className="calculator-price-lines quote-price-lines">
        <div><dt>Core installation</dt><dd>{currency.format(result.coreInstallation)}</dd></div>
        <div><dt>Components</dt><dd>{currency.format(result.components)}</dd></div>
        <div><dt>Removal + repairs</dt><dd>{currency.format(result.removalAndRepairs)}</dd></div>
        <div><dt>Complexity</dt><dd>{currency.format(result.complexity)}</dd></div>
        <div><dt>Travel</dt><dd>{currency.format(result.travel)}</dd></div>
        <div><dt>Condition allowance</dt><dd>{currency.format(result.contingency)}</dd></div>
        <div><dt>Discount ({result.appliedDiscountPercent}%)</dt><dd>− {currency.format(result.discount)}</dd></div>
        <div><dt>Tax</dt><dd>{currency.format(result.tax)}</dd></div>
      </dl>
      <div className="calculator-total"><span>Estimated total</span><strong>{currency.format(result.total)}</strong></div>
      <div className="quote-payment-grid"><div><span>Deposit ({values.depositPercent}%)</span><strong>{currency.format(result.deposit)}</strong></div><div><span>Remaining balance</span><strong>{currency.format(result.balance)}</strong></div></div>
      {result.flags.length > 0 && <div className="quote-review-flags"><span>Review before quoting</span><ul>{result.flags.map((flag) => <li key={flag}>{flag}</li>)}</ul></div>}
      <div className="calculator-explanation"><span>Why this price</span>{result.hasWork ? <ul>{result.explanation.map((line) => <li key={line}>{line}</li>)}</ul> : <p>Add measurements or repair scope to create an estimate.</p>}</div>
    </aside>
  );
}

export function PricingCalculatorPanel({ quote, values, onChange }: { quote: QuoteInputs; values: PricingValues; onChange: (change: Partial<QuoteInputs>) => void }) {
  const [activeStep, setActiveStep] = useState(0);
  const active = steps[activeStep];
  return (
    <div className="calculator-layout quote-calculator-layout">
      <form className="calculator-form quote-builder" aria-label="Synthetic quote builder">
        <div className="quote-builder-head"><div><span>Quote builder</span><strong>{active.label}</strong></div><small>Step {activeStep + 1} of {steps.length}</small></div>
        <div className="quote-step-nav" role="tablist" aria-label="Quote sections">
          {steps.map((step, index) => <button type="button" role="tab" aria-selected={activeStep === index} className={activeStep === index ? "quote-step-button quote-step-button--active" : "quote-step-button"} onClick={() => setActiveStep(index)} key={step.id}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step.label}</strong></button>)}
        </div>
        <div className="quote-step-panel" role="tabpanel">
          {active.id === "project" && <ProjectStep quote={quote} update={onChange} />}
          {active.id === "measurements" && <MeasurementsStep quote={quote} update={onChange} />}
          {active.id === "conditions" && <ConditionsStep quote={quote} update={onChange} />}
          {active.id === "pricing" && <PricingStep quote={quote} values={values} update={onChange} />}
        </div>
        <div className="quote-builder-actions"><button type="button" onClick={() => setActiveStep((step) => Math.max(0, step - 1))} disabled={activeStep === 0}>← Back</button><span>{activeStep + 1} / {steps.length}</span><button type="button" onClick={() => setActiveStep((step) => Math.min(steps.length - 1, step + 1))} disabled={activeStep === steps.length - 1}>Next →</button></div>
      </form>
      <EstimateSummary quote={quote} values={values} />
    </div>
  );
}
