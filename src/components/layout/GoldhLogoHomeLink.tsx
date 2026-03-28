"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

type GoldhLogoHomeLinkProps = {
  className?: string;
  onClick?: () => void;
  size?: "sm" | "md";
};

export function GoldhLogoHomeLink({
  className,
  onClick,
  size = "sm",
}: GoldhLogoHomeLinkProps) {
  const box =
    size === "sm"
      ? "h-8 max-h-8 w-auto max-w-[min(7.5rem,28vw)]"
      : "h-10 max-h-10 w-auto max-w-[10rem]";

  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-md p-0.5 outline-none ring-amber-400/0 transition hover:bg-zinc-900/60 focus-visible:ring-2 focus-visible:ring-amber-400/50",
        className,
      )}
      aria-label="Golden Horizon — Home"
    >
      <img
        src="/goldh-logo.png"
        alt=""
        width={160}
        height={48}
        decoding="async"
        className={cn(box, "object-contain object-left")}
      />
    </Link>
  );
}
