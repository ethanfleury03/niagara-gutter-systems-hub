export type JobType = "new" | "replacement" | "guards" | "repair";
export type PropertyType = "residential" | "commercial";
export type TravelZone = "local" | "extended" | "outside";
export type GutterSize = "5" | "6";
export type RoofPitch = "standard" | "steep";
export type Access = "standard" | "difficult";
export type Equipment = "none" | "lift";

export type PricingValues = {
  gutter5PerFoot: number;
  gutter6PerFoot: number;
  guardPerFoot: number;
  downspoutEach: number;
  cornerEach: number;
  outletEach: number;
  endCapEach: number;
  extensionEach: number;
  removalPerFoot: number;
  fasciaPerFoot: number;
  laborPerHour: number;
  additionalStoryPercent: number;
  steepPitchPercent: number;
  difficultAccess: number;
  liftEquipment: number;
  extendedTravel: number;
  outsideTravel: number;
  commercialPercent: number;
  minimumJob: number;
  maximumDiscountPercent: number;
  defaultContingencyPercent: number;
  depositPercent: number;
  taxPercent: number;
};

export type QuoteInputs = {
  jobType: JobType;
  propertyType: PropertyType;
  travelZone: TravelZone;
  projectLabel: string;
  gutterSize: GutterSize;
  gutterFeet: number;
  guardFeet: number;
  downspouts: number;
  corners: number;
  outlets: number;
  endCaps: number;
  extensions: number;
  stories: 1 | 2 | 3;
  roofPitch: RoofPitch;
  access: Access;
  removeExisting: boolean;
  fasciaFeet: number;
  equipment: Equipment;
  additionalLaborHours: number;
  contingencyPercent: number;
  discountPercent: number;
  applyTax: boolean;
  notes: string;
};

export type ValueKey = keyof PricingValues;
export type ValueRow = { key: ValueKey; item: string; unit: string; prefix?: string; suffix?: string };
export type ValueGroup = { id: string; title: string; description: string; rows: ValueRow[] };

export const defaultPricingValues: PricingValues = {
  gutter5PerFoot: 12,
  gutter6PerFoot: 16,
  guardPerFoot: 18,
  downspoutEach: 95,
  cornerEach: 28,
  outletEach: 18,
  endCapEach: 12,
  extensionEach: 35,
  removalPerFoot: 2,
  fasciaPerFoot: 22,
  laborPerHour: 85,
  additionalStoryPercent: 15,
  steepPitchPercent: 12,
  difficultAccess: 150,
  liftEquipment: 450,
  extendedTravel: 75,
  outsideTravel: 175,
  commercialPercent: 8,
  minimumJob: 750,
  maximumDiscountPercent: 10,
  defaultContingencyPercent: 5,
  depositPercent: 50,
  taxPercent: 0,
};

export const defaultQuoteInputs: QuoteInputs = {
  jobType: "new",
  propertyType: "residential",
  travelZone: "local",
  projectLabel: "",
  gutterSize: "5",
  gutterFeet: 0,
  guardFeet: 0,
  downspouts: 0,
  corners: 0,
  outlets: 0,
  endCaps: 0,
  extensions: 0,
  stories: 1,
  roofPitch: "standard",
  access: "standard",
  removeExisting: false,
  fasciaFeet: 0,
  equipment: "none",
  additionalLaborHours: 0,
  contingencyPercent: 0,
  discountPercent: 0,
  applyTax: false,
  notes: "",
};

export const valueGroups: ValueGroup[] = [
  {
    id: "materials",
    title: "Materials + installation",
    description: "Synthetic per-foot selling prices for the core scope.",
    rows: [
      { key: "gutter5PerFoot", item: "5-inch seamless gutter", unit: "Per foot", prefix: "$" },
      { key: "gutter6PerFoot", item: "6-inch seamless gutter", unit: "Per foot", prefix: "$" },
      { key: "guardPerFoot", item: "Alu-Rex-style gutter guard", unit: "Per foot", prefix: "$" },
    ],
  },
  {
    id: "components",
    title: "Components",
    description: "Unit prices for drainage and finishing components.",
    rows: [
      { key: "downspoutEach", item: "Downspout", unit: "Each", prefix: "$" },
      { key: "cornerEach", item: "Inside/outside corner", unit: "Each", prefix: "$" },
      { key: "outletEach", item: "Outlet", unit: "Each", prefix: "$" },
      { key: "endCapEach", item: "End cap", unit: "Each", prefix: "$" },
      { key: "extensionEach", item: "Downspout extension", unit: "Each", prefix: "$" },
    ],
  },
  {
    id: "labor",
    title: "Removal + field conditions",
    description: "Synthetic labor, repair, access, and equipment modifiers.",
    rows: [
      { key: "removalPerFoot", item: "Existing gutter removal", unit: "Per foot", prefix: "$" },
      { key: "fasciaPerFoot", item: "Fascia allowance", unit: "Per foot", prefix: "$" },
      { key: "laborPerHour", item: "Additional field labor", unit: "Per hour", prefix: "$" },
      { key: "additionalStoryPercent", item: "Additional-story adjustment", unit: "Per additional story", suffix: "%" },
      { key: "steepPitchPercent", item: "Steep-roof adjustment", unit: "Percentage", suffix: "%" },
      { key: "difficultAccess", item: "Difficult access", unit: "Fixed amount", prefix: "$" },
      { key: "liftEquipment", item: "Lift/equipment allowance", unit: "Fixed amount", prefix: "$" },
    ],
  },
  {
    id: "controls",
    title: "Travel + pricing controls",
    description: "Minimums, approval limits, deposit, and optional tax settings.",
    rows: [
      { key: "extendedTravel", item: "Extended travel zone", unit: "Fixed amount", prefix: "$" },
      { key: "outsideTravel", item: "Outside service area", unit: "Fixed amount", prefix: "$" },
      { key: "commercialPercent", item: "Commercial adjustment", unit: "Percentage", suffix: "%" },
      { key: "minimumJob", item: "Minimum job price", unit: "Minimum", prefix: "$" },
      { key: "maximumDiscountPercent", item: "Maximum salesperson discount", unit: "Percentage", suffix: "%" },
      { key: "defaultContingencyPercent", item: "Suggested contingency", unit: "Reference", suffix: "%" },
      { key: "depositPercent", item: "Deposit", unit: "Percentage", suffix: "%" },
      { key: "taxPercent", item: "Optional tax rate", unit: "Confirm before use", suffix: "%" },
    ],
  },
];

export const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function calculateQuote(quote: QuoteInputs, values: PricingValues) {
  const isGutterJob = quote.jobType === "new" || quote.jobType === "replacement";
  const gutterRate = quote.gutterSize === "6" ? values.gutter6PerFoot : values.gutter5PerFoot;
  const gutterPrice = isGutterJob ? quote.gutterFeet * gutterRate : 0;
  const guardPrice = quote.guardFeet * values.guardPerFoot;
  const coreInstallation = gutterPrice + guardPrice;

  const components =
    quote.downspouts * values.downspoutEach +
    quote.corners * values.cornerEach +
    quote.outlets * values.outletEach +
    quote.endCaps * values.endCapEach +
    quote.extensions * values.extensionEach;

  const removal = quote.removeExisting ? quote.gutterFeet * values.removalPerFoot : 0;
  const fascia = quote.fasciaFeet * values.fasciaPerFoot;
  const additionalLabor = quote.additionalLaborHours * values.laborPerHour;
  const removalAndRepairs = removal + fascia + additionalLabor;
  const fieldSubtotal = coreInstallation + components + removalAndRepairs;

  const storyPercent = Math.max(0, quote.stories - 1) * values.additionalStoryPercent;
  const pitchPercent = quote.roofPitch === "steep" ? values.steepPitchPercent : 0;
  const commercialPercent = quote.propertyType === "commercial" ? values.commercialPercent : 0;
  const percentageAdjustment = fieldSubtotal * ((storyPercent + pitchPercent + commercialPercent) / 100);
  const fixedConditions =
    (quote.access === "difficult" ? values.difficultAccess : 0) +
    (quote.equipment === "lift" ? values.liftEquipment : 0);
  const complexity = percentageAdjustment + fixedConditions;

  const travel = quote.travelZone === "extended" ? values.extendedTravel : quote.travelZone === "outside" ? values.outsideTravel : 0;
  const beforeContingency = fieldSubtotal + complexity + travel;
  const contingencyPercent = Math.max(0, quote.contingencyPercent);
  const contingency = beforeContingency * (contingencyPercent / 100);
  const beforeDiscount = beforeContingency + contingency;
  const requestedDiscount = Math.max(0, quote.discountPercent);
  const appliedDiscountPercent = Math.min(requestedDiscount, values.maximumDiscountPercent);
  const discount = beforeDiscount * (appliedDiscountPercent / 100);
  const afterDiscount = Math.max(0, beforeDiscount - discount);
  const hasWork = fieldSubtotal > 0;
  const preTaxTotal = hasWork ? Math.max(values.minimumJob, afterDiscount) : 0;
  const tax = quote.applyTax ? preTaxTotal * (values.taxPercent / 100) : 0;
  const total = Math.round(preTaxTotal + tax);
  const deposit = Math.round(total * (values.depositPercent / 100));
  const balance = total - deposit;

  const explanation: string[] = [];
  if (gutterPrice > 0) explanation.push(`${quote.gutterFeet} ft of ${quote.gutterSize}-inch gutter × ${currency.format(gutterRate)}`);
  if (guardPrice > 0) explanation.push(`${quote.guardFeet} ft of gutter guard × ${currency.format(values.guardPerFoot)}`);
  if (components > 0) explanation.push(`${currency.format(components)} in drainage components`);
  if (removalAndRepairs > 0) explanation.push(`${currency.format(removalAndRepairs)} removal, repair, and field labor`);
  if (complexity > 0) explanation.push(`${currency.format(complexity)} property and installation complexity`);
  if (travel > 0) explanation.push(`${currency.format(travel)} travel/mobilization`);
  if (contingency > 0) explanation.push(`${contingencyPercent}% condition allowance`);
  if (appliedDiscountPercent > 0) explanation.push(`${appliedDiscountPercent}% discount applied`);
  if (hasWork && preTaxTotal === values.minimumJob && afterDiscount < values.minimumJob) explanation.push(`${currency.format(values.minimumJob)} minimum job price applied`);

  const flags: string[] = [];
  if (requestedDiscount > values.maximumDiscountPercent) flags.push(`Discount limited to ${values.maximumDiscountPercent}%`);
  if (quote.travelZone === "outside") flags.push("Outside service area—review travel");
  if (quote.equipment === "lift") flags.push("Equipment requirement—confirm availability");
  if (quote.fasciaFeet > 0) flags.push("Fascia scope—confirm onsite condition");
  if (quote.stories === 3) flags.push("Three-story work—manager review");
  if (quote.applyTax && values.taxPercent === 0) flags.push("Tax selected but configured rate is 0%");

  return {
    hasWork,
    coreInstallation,
    components,
    removalAndRepairs,
    complexity,
    travel,
    contingency,
    discount,
    tax,
    total,
    deposit,
    balance,
    appliedDiscountPercent,
    discountLimited: requestedDiscount > values.maximumDiscountPercent,
    explanation,
    flags,
  };
}
