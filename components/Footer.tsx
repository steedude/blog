import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner shell">
        <p>
          Copyright © 2002–2026 前端觀察站. All rights reserved.
        </p>
        <p>
          <Link href="/archive">Archives</Link> · <Link href="/friends">Links</Link> ·{" "}
          <Link href="/search">Search</Link>
        </p>
        <p className="powered-by">Powered by MDX · Valid HTML</p>
      </div>
    </footer>
  );
}
