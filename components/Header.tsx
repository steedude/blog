import Link from "next/link";

export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner shell">
        <Link href="/" className="brand" aria-label="前端觀察站首頁">
          <span className="brand-title">前端觀察站</span>
          <span className="brand-subtitle">關於網頁標準、瀏覽器與前端開發的觀察筆記</span>
        </Link>
      </div>
    </header>
  );
}
