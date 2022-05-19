export const paginate = (
  array: Array<any>,
  pageNumber: number,
  pageSize: number = 10
) => {
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};

export const generateChartColor = (change: number): string => {
  if (change > 0) return "green";
  if (change < 0) return "red";
  return "var(--color-candb-blue-1)";
};

export const formatCurrency = (
  value: number,
  currency: string = "usd"
): string => {
  const aValue = Math.abs(value);
  switch (true) {
    // not a number
    case typeof value === "string":
    case isNaN(value):
      return "n/a";
    // billions
    case aValue > 1000000000:
      return `${value < 0 ? "-" : ""}${mapCurrencyToSymbol(currency)}${(
        aValue / 1000000000
      ).toFixed(2)}B`;
    // millions
    case aValue > 1000000:
      return `${value < 0 ? "-" : ""}${mapCurrencyToSymbol(currency)}${(
        aValue / 1000000
      ).toFixed(2)}M`;
    //thousands
    case aValue > 1000:
      return `${value < 0 ? "-" : ""}${mapCurrencyToSymbol(currency)}${(
        aValue / 1000
      ).toFixed(2)}k`;
    // TODO: Make this work better
    case aValue < 0.001:
      return `${mapCurrencyToSymbol(currency)}${"0"}`;
      return `${value < 0 ? "-" : ""}${mapCurrencyToSymbol(currency)}${aValue}`;

    default:
      return `${value < 0 ? "-" : ""}${mapCurrencyToSymbol(currency)}${(
        aValue / 100
      ).toFixed(2)}`;
  }
};

export const mapCurrencyToSymbol = (currency: string) => {
  switch (currency) {
    case "usd":
      return "$";
    case "gbp":
      return "£";
    case "aud":
      return "A$";
    case "eur":
      return "€";
    default:
      return "";
  }
};
