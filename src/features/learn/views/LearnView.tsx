"use client";

import { BookOpen, Zap } from "lucide-react";

export function LearnView() {
  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="h-px w-6 bg-amber-400/80" aria-hidden />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
            Knowledge centre
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Learning <span className="text-amber-400">Hub</span>
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-500">
          Your gateway to smarter investing — without the noise. Start with the
          intelligence engine behind GOLDH.
        </p>
      </div>

      <article className="overflow-hidden rounded-3xl border border-zinc-800/80 bg-[#0A0A0A] transition-colors duration-200 hover:border-amber-400/25 hover:bg-zinc-900/20">
        <div className="space-y-4 p-6 sm:p-8">
          <div className="text-center">
            <div className="mx-auto mb-3 h-px w-12 bg-amber-400/80" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
              Master the intelligence framework behind GOLDH
            </p>
          </div>
          <div className="flex justify-center">
            <div className="flex size-12 items-center justify-center rounded-xl border border-amber-400/40 bg-black/50">
              <Zap className="size-6 text-amber-400" />
            </div>
          </div>
          <h2 className="text-center text-xl font-bold text-white sm:text-2xl">
            Start Here: The GOLDH Intelligence{" "}
            <span className="text-amber-400">Engine</span>
          </h2>
          <p className="text-center text-sm leading-relaxed text-zinc-400">
            Financial markets generate an overwhelming amount of information
            every day. The real challenge is understanding what matters,
            interpreting signals correctly, and acting with conviction. GOLDH
            was built to bring institutional-grade investment intelligence to a
            wider community of investors.
          </p>
        </div>
      </article>

      <div className="flex items-start gap-3 rounded-2xl border border-zinc-900 bg-black/40 p-4">
        <BookOpen className="size-5 shrink-0 text-amber-400" />
        <p className="text-xs text-zinc-500">
          More modules and quizzes ship in Phase 2 — this page matches the mobile
          Knowledge Centre layout and scales on desktop.
        </p>
      </div>
    </div>
  );
}
