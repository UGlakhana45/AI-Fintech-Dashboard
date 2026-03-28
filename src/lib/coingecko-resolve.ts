const MOCK_OR_ALIAS_TO_GECKO: Record<string, string> = {
  btc: "bitcoin",
  eth: "ethereum",
  sol: "solana",
  ada: "cardano",
  aave: "aave",
  doge: "dogecoin",
  xrp: "ripple",
  link: "chainlink",
  dot: "polkadot",
  matic: "matic-network",
  avax: "avalanche-2",
};

export function toCoinGeckoCoinId(rawId: string): string {
  const key = rawId.trim().toLowerCase();
  return MOCK_OR_ALIAS_TO_GECKO[key] ?? key;
}

export function assetDetailHref(cryptoRowId: string): string {
  const id = encodeURIComponent(toCoinGeckoCoinId(cryptoRowId));
  return `/asset/${id}`;
}
