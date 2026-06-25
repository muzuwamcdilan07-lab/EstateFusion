export const CURRENCY_DEFAULT = "ZAR";

export function sanitizeString(v) {
  if (v === null || v === undefined) return "";
  return String(v).trim();
}

export function parseMoney(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

export function formatMoney(amount, currency = "ZAR") {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amount || 0);
  } catch {
    return `${amount || 0} ${currency}`;
  }
}

export function docTitleFromType(type) {
  switch (type) {
    case "Quotation":
      return "Quotation";
    case "Invoice":
      return "Invoice";
    case "Credit Note":
      return "Credit Note";
    case "Debit Note":
      return "Debit Note";
    default:
      return type;
  }
}


