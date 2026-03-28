"use client";

import { GoldhLogoHomeLink } from "@/components/layout/GoldhLogoHomeLink";
import { SidebarNav } from "@/components/layout/SidebarNav";
import { getPageTitle } from "@/lib/navigation-config";
import { useAppStore } from "@/stores/useAppStore";
import { usePaywallStore } from "@/stores/usePaywallStore";
import { Bell, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const NOTIFICATIONS = [
  { id: "1", text: "Pulse: market data refreshed (CoinGecko + cache)." },
  { id: "2", text: "Whale Watch: upgrade to Essential for live flows." },
  { id: "3", text: "STREETScore: PRO tier includes 380 tickers." },
] as const;

export function TopHeader() {
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const open = useAppStore((s) => s.mobileMenuOpen);
  const setMenuOpen = useAppStore((s) => s.setMobileMenuOpen);
  const notifOpen = useAppStore((s) => s.notificationsOpen);
  const setNotifOpen = useAppStore((s) => s.setNotificationsOpen);
  const setTier = usePaywallStore((s) => s.setSubscriptionTier);
  const title = getPageTitle(pathname);
  const notifRef = useRef<HTMLDivElement>(null);

  function signOutMobile() {
    setTier("free");
    setMenuOpen(false);
    router.push("/");
  }

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!notifOpen) return;
      if (notifRef.current?.contains(e.target as Node)) return;
      setNotifOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [notifOpen, setNotifOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-zinc-900/80 bg-black/85 backdrop-blur-xl">
        <div className="flex w-full items-center justify-between gap-2 px-3 py-3 md:px-5 lg:px-6">
          <div className="gh-only-below-lg flex min-w-0 shrink-0 items-center gap-1">
            <GoldhLogoHomeLink size="sm" />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
          </div>
          <div className="min-w-0 flex-1 lg:flex lg:items-center lg:gap-3">
            <h1 className="truncate text-center text-sm font-bold tracking-tight text-white lg:text-left">
              {title}
            </h1>
          </div>
          <div className="relative flex shrink-0 items-center gap-1" ref={notifRef}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setNotifOpen(!notifOpen);
              }}
              className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
              aria-expanded={notifOpen}
              aria-haspopup="true"
              aria-label="Notifications"
            >
              <Bell className="size-5" />
            </button>
            {notifOpen ? (
              <div
                className="absolute right-0 top-full z-50 mt-2 w-[min(100vw-2rem,20rem)] rounded-xl border border-zinc-800 bg-[#0A0A0A] py-2 shadow-xl shadow-black/50"
                role="dialog"
                aria-label="Notifications"
              >
                <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-amber-500/80">
                  Alerts
                </p>
                <ul className="max-h-64 overflow-y-auto text-sm">
                  {NOTIFICATIONS.map((n) => (
                    <li
                      key={n.id}
                      className="border-b border-zinc-900/80 px-3 py-2.5 text-zinc-400 last:border-0"
                    >
                      {n.text}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <Link
              href="/profile"
              className="flex size-9 items-center justify-center rounded-full bg-amber-400 text-sm font-bold text-black transition hover:bg-amber-300"
              aria-label="Profile"
            >
              U
            </Link>
          </div>
        </div>
      </header>

      {open ? (
        <div className="gh-only-below-lg fixed inset-0 z-[60]">
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <aside className="absolute left-0 top-0 flex h-full w-[min(100vw-3rem,20rem)] flex-col bg-black shadow-2xl shadow-black ring-1 ring-zinc-800">
            <div className="flex items-center justify-between gap-2 border-b border-zinc-900 px-4 py-4">
              <GoldhLogoHomeLink
                size="md"
                onClick={() => setMenuOpen(false)}
              />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="flex flex-1 flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto px-3 py-4">
                <SidebarNav onNavigate={() => setMenuOpen(false)} />
              </div>
              <div className="border-t border-zinc-900 p-3">
                <button
                  type="button"
                  onClick={signOutMobile}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"
                >
                  <LogOut className="size-4 shrink-0" />
                  Sign out
                </button>
              </div>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
