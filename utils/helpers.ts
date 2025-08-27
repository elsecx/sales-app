export function generateRandomId(): string {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

export function formatCurrencyID(value: number | string, withPrefix: boolean = true): string {
  if (value === null || value === undefined || value === "") return withPrefix ? "Rp0" : "0";

  const numberValue = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(numberValue)) return withPrefix ? "Rp0" : "0";

  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numberValue);

  return withPrefix ? formatted : formatted.replace("Rp", "").trim();
}
