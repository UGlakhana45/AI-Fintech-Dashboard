"use client";

import { cn } from "@/lib/utils";
import {
  Activity,
  LayoutGrid,
  MoreHorizontal,
  Waves,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/", label: "Home", icon: LayoutGrid },
  { href: "/pulse", label: "Pulse", icon: Activity },
  { href: "/catalyst", label: "Catalyst", icon: Zap },
  { href: "/whale", label: "Whale", icon: Waves },
  { href: "/more", label: "More", icon: MoreHorizontal },
] as const;

export function BottomNav() {
  const pathname = usePathname() ?? "/";

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-900 bg-black/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
      aria-label="Primary"
    >
      <div className="flex w-full items-stretch justify-around px-1 pt-1">
        {ITEMS.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/"
              ? pathname === "/" || pathname === ""
              : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-lg py-2 text-[10px] font-semibold transition-colors sm:text-xs",
                active
                  ? "text-amber-400"
                  : "text-zinc-500 hover:text-zinc-300",
              )}
            >
              <Icon className="size-5 shrink-0" strokeWidth={active ? 2.25 : 2} />
              <span className="truncate">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
