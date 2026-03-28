import { z } from "zod";

export const portfolioHoldingSchema = z.object({
  id: z.string(),
  symbol: z.string(),
  entity: z.string(),
  dateIn: z.string(),
  valueUsd: z.number(),
});

export type PortfolioHolding = z.infer<typeof portfolioHoldingSchema>;

export const portfolioHoldingsPayloadSchema = z.object({
  holdings: z.array(portfolioHoldingSchema),
});

export type PortfolioHoldingsPayload = z.infer<
  typeof portfolioHoldingsPayloadSchema
>;
