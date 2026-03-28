"use client";

import {
  NAV_EXPLORE,
  NAV_FEATURES,
  NAV_FOOTER,
  NAV_HOME,
  NAV_INTELLIGENCE_HUB,
  pathMatchesNav,
} from "@/lib/navigation-config";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SidebarNavProps {
  onNavigate?: () => void;
}

function NavButton({
  href,
  label,
  icon: Icon,
  active,
  onClick,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
        active
          ? "bg-amber-400/10 text-amber-400 ring-1 ring-amber-400/25"
          : "text-zinc-400 hover:bg-zinc-900 hover:text-white",
      )}
    >
      <Icon className="size-4 shrink-0 opacity-90" strokeWidth={2} />
      <span className="truncate">{label}</span>
    </Link>
  );
}

export function SidebarNav({ onNavigate }: SidebarNavProps) {
  const pathname = usePathname() ?? "/";

  return (
    <div className="flex flex-col gap-6 text-sm">
      <div>
        <NavButton
          href={NAV_HOME.href}
          label={NAV_HOME.label}
          icon={NAV_HOME.icon}
          active={pathMatchesNav(pathname, NAV_HOME.href)}
          onClick={onNavigate}
        />
      </div>

      <div>
        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
          Features
        </p>
        <nav className="flex flex-col gap-0.5" aria-label="Features">
          {NAV_FEATURES.map((item) => (
            <NavButton
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={pathMatchesNav(pathname, item.href)}
              onClick={onNavigate}
            />
          ))}
        </nav>
      </div>

      <div>
        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
          Intelligence hub
        </p>
        <nav className="flex flex-col gap-0.5" aria-label="Intelligence hub">
          {NAV_INTELLIGENCE_HUB.map((item) => (
            <NavButton
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={pathMatchesNav(pathname, item.href)}
              onClick={onNavigate}
            />
          ))}
        </nav>
      </div>

      <div>
        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
          Explore
        </p>
        <nav className="flex flex-col gap-0.5" aria-label="Explore">
          {NAV_EXPLORE.map((item) => (
            <NavButton
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={pathMatchesNav(pathname, item.href)}
              onClick={onNavigate}
            />
          ))}
        </nav>
      </div>

      <div className="mt-auto border-t border-zinc-900 pt-4">
        <nav className="flex flex-col gap-0.5" aria-label="Account">
          <NavButton
            href="/profile"
            label="Profile"
            icon={User}
            active={pathMatchesNav(pathname, "/profile")}
            onClick={onNavigate}
          />
          {NAV_FOOTER.map((item) => (
            <NavButton
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={pathMatchesNav(pathname, item.href)}
              onClick={onNavigate}
            />
          ))}
        </nav>
      </div>
    </div>
  );
}
