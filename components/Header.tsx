import Link from "next/link";

const links = [
  ["首頁", "/"],
  ["分類", "/categories"],
  ["標籤", "/tags"],
  ["歸檔", "/archive"],
  ["友站", "/friends"],
  ["搜尋", "/search"],
];

export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner shell">
        <Link href="/" className="brand" aria-label="前端觀察站首頁">
          <span className="brand-title">前端觀察站</span>
          <span className="brand-subtitle">Frontend Notes — a weblog about the front end</span>
        </Link>
        <nav className="main-nav" aria-label="主要導覽">
          {links.map(([label, href]) => (
            <Link href={href} key={href}>{label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
