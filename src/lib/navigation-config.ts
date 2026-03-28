import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BarChart3,
  BookOpen,
  Briefcase,
  LayoutGrid,
  MessageSquare,
  Tag,
  TrendingUp,
  Waves,
  Zap,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_HOME: NavItem = {
  href: "/",
  label: "Home",
  icon: LayoutGrid,
};

export const NAV_FEATURES: NavItem[] = [
  { href: "/pulse", label: "GoldH Pulse", icon: Activity },
  { href: "/guru-talk", label: "Guru Talk", icon: MessageSquare },
  { href: "/catalyst", label: "Catalyst Intelligence", icon: Zap },
  { href: "/whale", label: "Whale Watch", icon: Waves },
  { href: "/streetscore", label: "STREETScore", icon: BarChart3 },
];

export const NAV_INTELLIGENCE_HUB: NavItem[] = [
  {
    href: "/portfolio-intelligence",
    label: "Portfolio Intelligence",
    icon: Briefcase,
  },
  { href: "/cio-insights", label: "CIO Insights", icon: TrendingUp },
];

export const NAV_EXPLORE: NavItem[] = [
  { href: "/learn", label: "Learn", icon: BookOpen },
];

export const NAV_FOOTER: NavItem[] = [
  { href: "/pricing", label: "Pricing", icon: Tag },
];

export function pathMatchesNav(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/" || pathname === "";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const ROUTE_TITLES: { prefix: string; title: string }[] = [
  { prefix: "/portfolio-intelligence", title: "Portfolio Intelligence" },
  { prefix: "/asset", title: "Asset detail" },
  { prefix: "/cio-insights", title: "CIO Insights" },
  { prefix: "/guru-talk", title: "Guru Talk" },
  { prefix: "/streetscore", title: "STREETScore" },
  { prefix: "/learn", title: "Learn" },
  { prefix: "/demo", title: "Demo" },
  { prefix: "/profile", title: "Profile" },
  { prefix: "/pricing", title: "Pricing" },
  { prefix: "/pulse", title: "Pulse" },
  { prefix: "/catalyst", title: "Catalyst" },
  { prefix: "/whale", title: "Whale Watch" },
  { prefix: "/more", title: "More" },
  { prefix: "/", title: "Home" },
];

export function getPageTitle(pathname: string): string {
  const norm = pathname || "/";
  const sorted = [...ROUTE_TITLES].sort(
    (a, b) => b.prefix.length - a.prefix.length,
  );
  for (const { prefix, title } of sorted) {
    if (prefix === "/") {
      if (norm === "/" || norm === "") return title;
      continue;
    }
    if (norm === prefix || norm.startsWith(`${prefix}/`)) {
      return title;
    }
  }
  return "GOLDH";
}
