import {
  cioInsightsListSchema,
  type CioInsightsList,
} from "@/features/cio-insights/schemas/cio-insight.schema";

export function getMockCioInsights(): CioInsightsList {
  return cioInsightsListSchema.parse({
    insights: [
      {
        id: "nvda-mar18",
        slug: "nvda-mar-18",
        title: "GOLDH INVESTMENT ALERT - March, 18th 2026",
        snippet:
          "Click to view full insight details and investment takeaways.",
        ticker: "NVDA",
        dateLabel: "03/18",
        readMinutes: 3,
        body: [
          {
            type: "h",
            text: "From ‘Magnificent 7’ to the AI Core",
          },
          {
            type: "p",
            text: "We see a multi-year infrastructure investment cycle supporting leading AI accelerators. NVIDIA remains our focus while we watch META and AMZN for secondary leverage to compute and distribution.",
          },
          {
            type: "h",
            text: "Why we focus on NVIDIA (NVDA)",
          },
          {
            type: "p",
            text: "Workload concentration, ecosystem moat, and capex visibility underpin upside — balanced against valuation and regulatory headlines.",
          },
        ],
      },
    ],
  });
}
