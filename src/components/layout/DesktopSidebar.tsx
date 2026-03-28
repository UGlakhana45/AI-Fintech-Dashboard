"use client";

import { GoldhLogoHomeLink } from "@/components/layout/GoldhLogoHomeLink";
import { SidebarNav } from "@/components/layout/SidebarNav";
import { usePaywallStore } from "@/stores/usePaywallStore";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function DesktopSidebar() {
  const router = useRouter();
  const setTier = usePaywallStore((s) => s.setSubscriptionTier);

  function signOut() {
    setTier("free");
    router.push("/");
    router.refresh();
  }

  return (
    <aside
      className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-zinc-900 bg-black lg:flex"
      aria-label="Main navigation"
    >
      <div className="border-b border-zinc-900 px-3 py-4">
        <GoldhLogoHomeLink size="md" className="px-0" />
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto px-3 py-4">
        <SidebarNav />
        <button
          type="button"
          onClick={signOut}
          className="mt-4 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-900 hover:text-zinc-300"
        >
          <LogOut className="size-4 shrink-0" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
