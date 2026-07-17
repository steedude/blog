"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteShell } from "@/lib/styles";

export function Footer() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <footer className="pb-6 text-center text-xs text-neutral-800">
      <div className={`${siteShell} border-y border-frame bg-paper/85 p-3 md:border-x md:border-t-0`}>
        <p className="my-0.5">
          « <Link href="/">Recent Entries</Link> | <Link href="/">Main</Link> |{" "}
          <Link href="/archive">Archives</Link> | <Link href="/categories">Categories</Link> |{" "}
          <Link href="/tags">Tags</Link> | <Link href="/friends">Links</Link> »
        </p>
        <p className="my-0.5">© 2026 前端觀察站 · Inspired by Movable Type 2.2 · Powered by Next.js</p>
      </div>
    </footer>
  );
}
