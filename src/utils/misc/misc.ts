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

export const formatCurrency = (value: number): string => {
  console.log(value);
  const aValue = Math.abs(value);
  switch (true) {
    // not a number
    case typeof value === "string":
    case isNaN(value):
      return "n/a";
    // billions
    case aValue > 1000000000:
      return `${value < 0 ? "-" : ""}$${(aValue / 1000000000).toFixed(2)}B`;
    // millions
    case aValue > 1000000:
      return `${value < 0 ? "-" : ""}$${(aValue / 1000000).toFixed(2)}M`;
    //thousands
    case aValue > 1000:
      return `${value < 0 ? "-" : ""}$${(aValue / 1000).toFixed(2)}k`;
    case aValue < 0.001:
      return `${value < 0 ? "-" : ""}$${aValue}`;

    default:
      return `${value < 0 ? "-" : ""}$${(aValue / 100).toFixed(2)}`;
  }
};
