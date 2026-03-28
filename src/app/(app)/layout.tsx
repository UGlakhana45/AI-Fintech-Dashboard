import { AppShell } from "@/components/layout/AppShell";
import { AppTransition } from "@/components/layout/AppTransition";
import { BottomNav } from "@/components/layout/BottomNav";
import { TopHeader } from "@/components/layout/TopHeader";
import type { ReactNode } from "react";

export default function AppShellLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell>
      <TopHeader />
      <main className="min-h-0 w-full flex-1 px-3 pb-28 pt-2 md:px-6 md:pb-8 lg:px-8 lg:pb-10">
        <div className="mx-auto w-full max-w-6xl">
          <AppTransition>{children}</AppTransition>
        </div>
      </main>
      <BottomNav />
    </AppShell>
  );
}
