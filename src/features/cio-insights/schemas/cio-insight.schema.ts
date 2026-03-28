import { z } from "zod";

export const cioInsightSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  snippet: z.string(),
  ticker: z.string(),
  dateLabel: z.string(),
  readMinutes: z.number().int().positive(),
  body: z.array(
    z.object({
      type: z.enum(["p", "h"]),
      text: z.string(),
    }),
  ),
});

export type CioInsight = z.infer<typeof cioInsightSchema>;

export const cioInsightsListSchema = z.object({
  insights: z.array(cioInsightSchema),
});

export type CioInsightsList = z.infer<typeof cioInsightsListSchema>;
