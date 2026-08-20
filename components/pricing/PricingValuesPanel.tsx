"use client";

import {
  valueGroups,
  type PricingValues,
  type ValueKey,
} from "./pricingModel";

export function PricingValuesPanel({
  values,
  onChange,
  onReset,
}: {
  values: PricingValues;
  onChange: (key: ValueKey, value: number) => void;
  onReset: () => void;
}) {
  return (
    <div className="values-panel values-panel--grouped">
      <div className="values-intro">
        <div><span>Pricing configuration</span><strong>Synthetic values</strong></div>
        <p>Every change applies immediately to the quote builder. These values are placeholders until Brad confirms Niagara Gutter’s actual pricing rules.</p>
      </div>

      <div className="value-groups">
        {valueGroups.map((group) => (
          <section className="value-group" aria-labelledby={`value-group-${group.id}`} key={group.id}>
            <div className="value-group-head">
              <div><span>{String(valueGroups.indexOf(group) + 1).padStart(2, "0")}</span><h3 id={`value-group-${group.id}`}>{group.title}</h3></div>
              <p>{group.description}</p>
            </div>
            <div className="values-table" role="table" aria-label={`${group.title} values`}>
              <div className="values-row values-row--head" role="row"><span role="columnheader">Item</span><span role="columnheader">Unit</span><span role="columnheader">Assigned value</span></div>
              {group.rows.map((row) => (
                <div className="values-row" role="row" key={row.key}>
                  <strong role="cell">{row.item}</strong>
                  <span role="cell">{row.unit}</span>
                  <label role="cell" aria-label={`${row.item} value`} className={`value-input${row.prefix ? " value-input--prefix" : ""}${row.suffix ? " value-input--suffix" : ""}`}>
                    {row.prefix && <b className="value-affix value-affix--prefix">{row.prefix}</b>}
                    <input type="number" min="0" value={values[row.key]} onChange={(event) => onChange(row.key, Math.max(0, Number(event.target.value)))} inputMode="decimal" />
                    {row.suffix && <b className="value-affix value-affix--suffix">{row.suffix}</b>}
                  </label>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="values-actions"><span>Changes update the estimate instantly</span><button type="button" onClick={onReset}>Reset synthetic values</button></div>
    </div>
  );
}
