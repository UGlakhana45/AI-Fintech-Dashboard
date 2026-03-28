"use client";

import type { SubscriptionTier } from "@/stores/usePaywallStore";
import { usePaywallStore } from "@/stores/usePaywallStore";
import { Key, Sparkles, User } from "lucide-react";
import { useState, type FormEvent } from "react";

const TIERS: SubscriptionTier[] = ["free", "essential", "pro"];

export function ProfilePageClient() {
  const [name, setName] = useState("Uday Lakhana");
  const [email, setEmail] = useState("lakhanuday9@gmail.com");
  const [currentPw, setCurrentPw] = useState("");
  const [nextPw, setNextPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [passwordFormError, setPasswordFormError] = useState<string | null>(
    null,
  );

  const tier = usePaywallStore((s) => s.subscriptionTier);
  const setTier = usePaywallStore((s) => s.setSubscriptionTier);

  function onPasswordSubmit(e: FormEvent) {
    e.preventDefault();
    setPasswordFormError(null);
    if (nextPw.length < 6) {
      setPasswordFormError("New password must be at least 6 characters.");
      return;
    }
    if (nextPw !== confirmPw) {
      setPasswordFormError("New passwords do not match.");
      return;
    }
    setCurrentPw("");
    setNextPw("");
    setConfirmPw("");
  }

  return (
    <div className="space-y-5 pb-2">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500/80">
          Account
        </p>
        <div className="mt-1 flex items-center gap-2">
          <User className="size-5 text-amber-400" />
          <h1 className="text-xl font-bold text-white">
            Profile <span className="text-amber-400">Settings</span>
          </h1>
        </div>
        <p className="mt-1 text-sm text-zinc-500">
          Manage your account and subscription.
        </p>
      </div>

      <section className="rounded-2xl border border-zinc-800/80 bg-[#0A0A0A] p-4">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg border border-amber-400/40 bg-black/50">
            <User className="size-4 text-amber-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">
              Account information
            </h2>
            <p className="text-xs text-zinc-500">Your basic account details</p>
          </div>
        </div>
        <label className="block text-[10px] font-bold uppercase tracking-wide text-zinc-500">
          User name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-xl border border-zinc-800 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-amber-400/40 focus:outline-none focus:ring-1 focus:ring-amber-400/30"
          />
        </label>
        <label className="mt-3 block text-[10px] font-bold uppercase tracking-wide text-zinc-500">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border border-zinc-800 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-amber-400/40 focus:outline-none focus:ring-1 focus:ring-amber-400/30"
          />
        </label>
      </section>

      <section className="rounded-2xl border border-zinc-800/80 bg-[#0A0A0A] p-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500/80">
          Subscription
        </p>
        <div className="mt-2 flex items-start gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg border border-amber-400/40 bg-black/50">
            <Sparkles className="size-4 text-amber-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">
              Unlock <span className="text-amber-400">full access</span>
            </h2>
            <p className="mt-1 text-xs text-zinc-500">
              Upgrade to Essential or Pro for live market data, alerts, whale
              tracking, and more.
            </p>
          </div>
        </div>
        <p className="mt-3 text-[10px] font-bold uppercase tracking-wide text-zinc-500">
          Demo tier (also on More)
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {TIERS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTier(t)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-semibold capitalize ${
                tier === t
                  ? "border-amber-400/60 bg-amber-400/10 text-amber-400"
                  : "border-zinc-800 text-zinc-400 hover:border-zinc-600"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-800/80 bg-[#0A0A0A] p-4">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg border border-amber-400/40 bg-black/50">
            <Key className="size-4 text-amber-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Change password</h2>
            <p className="text-xs text-zinc-500">Update your account password</p>
          </div>
        </div>
        <form onSubmit={onPasswordSubmit} className="space-y-3">
          {passwordFormError ? (
            <p
              className="rounded-lg border border-red-500/35 bg-red-950/25 px-3 py-2 text-xs text-red-200"
              role="alert"
            >
              {passwordFormError}
            </p>
          ) : null}
          <input
            type="password"
            autoComplete="current-password"
            placeholder="Enter current password"
            value={currentPw}
            onChange={(e) => setCurrentPw(e.target.value)}
            className="w-full rounded-xl border border-zinc-800 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-amber-400/40 focus:outline-none focus:ring-1 focus:ring-amber-400/30"
          />
          <input
            type="password"
            autoComplete="new-password"
            placeholder="Enter new password (min. 6 characters)"
            value={nextPw}
            onChange={(e) => {
              setPasswordFormError(null);
              setNextPw(e.target.value);
            }}
            className="w-full rounded-xl border border-zinc-800 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-amber-400/40 focus:outline-none focus:ring-1 focus:ring-amber-400/30"
          />
          <input
            type="password"
            autoComplete="new-password"
            placeholder="Confirm new password"
            value={confirmPw}
            onChange={(e) => {
              setPasswordFormError(null);
              setConfirmPw(e.target.value);
            }}
            className="w-full rounded-xl border border-zinc-800 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-amber-400/40 focus:outline-none focus:ring-1 focus:ring-amber-400/30"
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-amber-400 py-3 text-sm font-bold text-black hover:bg-amber-300"
          >
            Change password
          </button>
        </form>
      </section>
    </div>
  );
}
