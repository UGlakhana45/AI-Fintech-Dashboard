"use client";

import { PortfolioChart } from "@/components/portfolio/PortfolioChart";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { usePortfolioData } from "@/hooks/usePortfolioData";

export function DashboardView() {
  const { data, isPending, isError, error } = usePortfolioData();

  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgb(30_58_138/0.25),transparent)]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-8 flex flex-col gap-2 border-b border-slate-800/80 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-indigo-400/90">
              Portfolio
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
              Total Balance: $124,500.00
            </h1>
          </div>
        </header>

        {isPending && (
          <div className="space-y-6">
            <div className="h-[320px] animate-pulse rounded-xl bg-slate-900/80 ring-1 ring-slate-800" />
            <div className="h-64 animate-pulse rounded-xl bg-slate-900/80 ring-1 ring-slate-800" />
          </div>
        )}

        {isError && (
          <div
            className="rounded-xl border border-rose-500/40 bg-rose-950/40 px-4 py-3 text-rose-200"
            role="alert"
          >
            {error?.message ?? "Failed to load portfolio data."}
          </div>
        )}

        {data && !isPending && (
          <div className="space-y-10">
            <section className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-6 shadow-xl shadow-black/20 ring-1 ring-slate-800/60 backdrop-blur-sm">
              <h2 className="mb-4 text-lg font-medium text-slate-200">
                30-day balance
              </h2>
              <PortfolioChart data={data.balanceHistory} />
            </section>

            <section>
              <h2 className="mb-4 text-lg font-medium text-slate-200">
                Recent transactions
              </h2>
              <TransactionTable transactions={data.transactions} />
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
