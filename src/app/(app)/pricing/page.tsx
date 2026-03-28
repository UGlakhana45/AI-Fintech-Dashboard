export default function PricingPage() {
  return (
    <div className="space-y-6 text-center">
      <div className="flex items-center justify-center gap-3">
        <span className="h-px w-8 bg-amber-400/60" />
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400">
          Institutional grade
        </p>
        <span className="h-px w-8 bg-amber-400/60" />
      </div>
      <h1 className="text-2xl font-black uppercase leading-tight tracking-tight text-white">
        GOLDH{" "}
        <span className="text-amber-400">Investment Intelligence</span>{" "}
        Platform
      </h1>
      <p className="text-sm text-zinc-500">
        Discover opportunities across global equities, crypto markets, macro
        trends, and smart money flows.
      </p>
      <div className="rounded-2xl border border-zinc-800/80 bg-[#0A0A0A] p-6 text-left">
        <h2 className="text-center text-sm font-bold text-white">
          How <span className="text-amber-400">GOLDH</span> works
        </h2>
        <p className="mt-2 text-center text-xs text-zinc-500">
          The Golden Intelligence Loop: from raw market data to automated alpha.
        </p>
        <p className="mt-6 text-center text-xs text-zinc-600">
          Full pricing table — Phase 2. Compare Free vs Essential vs Pro on the
          marketing site.
        </p>
      </div>
    </div>
  );
}
