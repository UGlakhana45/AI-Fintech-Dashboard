import { DesktopSidebar } from "@/components/layout/DesktopSidebar";
import type { ReactNode } from "react";

export interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-dvh w-full bg-black text-zinc-100">
      <DesktopSidebar />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
