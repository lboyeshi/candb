const BASE = "https://api.coingecko.com/api/v3/";

export const COINS_LIST = (): string => BASE + "coins/list";

export const COINS_MARKETS = (
  pageNumber: number,
  pageSize: number,
  currency: string = "usd"
): string =>
  BASE +
  `coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${pageSize}&page=${pageNumber}&sparkline=true`;

export const COINS_MARKET_CHART = (
  id: string,
  vsCurrency: string = "usd",
  days: number = 7
): string =>
  BASE + `coins/${id}/market_chart?vs_currency=${vsCurrency}&days=${days}`;

export const SIMPLE_PRICE = (
  id: string,
  vsCurrencies: Array<string> = ["usd"]
) =>
  BASE +
  `simple/price?ids=${id}&vs_currencies=${vsCurrencies}&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`;

export const GLOBAL = () => BASE + `global`;
