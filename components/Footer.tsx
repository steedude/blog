import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner shell">
        <p>
          « <Link href="/">Recent Entries</Link> | <Link href="/">Main</Link> |{" "}
          <Link href="/archive">Archives</Link> | <Link href="/categories">Categories</Link> |{" "}
          <Link href="/tags">Tags</Link> | <Link href="/friends">Links</Link> »
        </p>
        <p>© 2026 前端觀察站 · Inspired by Movable Type 2.2 · Powered by Next.js</p>
      </div>
    </footer>
  );
}
