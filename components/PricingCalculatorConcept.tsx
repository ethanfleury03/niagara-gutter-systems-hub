"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { PricingCalculatorPanel } from "./pricing/PricingCalculatorPanel";
import { PricingValuesPanel } from "./pricing/PricingValuesPanel";
import {
  defaultPricingValues,
  defaultQuoteInputs,
  type PricingValues,
  type QuoteInputs,
  type ValueKey,
} from "./pricing/pricingModel";

type TabId = "calculator" | "values";

const tabs: { id: TabId; label: string }[] = [
  { id: "calculator", label: "Calculator" },
  { id: "values", label: "Values" },
];

export function PricingCalculatorConcept() {
  const [activeTab, setActiveTab] = useState<TabId>("calculator");
  const [quote, setQuote] = useState<QuoteInputs>(defaultQuoteInputs);
  const [values, setValues] = useState<PricingValues>(defaultPricingValues);
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

  function updateValue(key: ValueKey, value: number) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="calculator-shell calculator-shell--professional">
      <div className="calculator-shell-head">
        <div><span>Interactive prototype</span><strong>Professional quote workspace</strong></div>
        <p>Live synthetic estimate · All assumptions remain editable</p>
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
        {activeTab === "calculator" ? (
          <PricingCalculatorPanel quote={quote} values={values} onChange={(change) => setQuote((current) => ({ ...current, ...change }))} />
        ) : (
          <PricingValuesPanel values={values} onChange={updateValue} onReset={() => setValues(defaultPricingValues)} />
        )}
      </div>
    </div>
  );
}
