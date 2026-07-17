import Link from "next/link";
import { siteShell } from "@/lib/styles";

export function Header() {
  return (
    <header className="mt-0 text-ink md:mt-6 lg:mt-10">
      <div className={`${siteShell} border-y border-frame bg-header-fade md:border`}>
        <Link
          href="/"
          className="block px-4 py-5 !text-black !no-underline"
          aria-label="前端觀察站首頁"
        >
          <span className="block font-serif text-2xl leading-none font-normal tracking-normal md:text-3xl">
            前端觀察站
          </span>
          <span className="mt-1 block text-xs font-normal tracking-normal text-neutral-800 md:text-sm">
            關於網頁標準、瀏覽器與前端開發的觀察筆記
          </span>
        </Link>
      </div>
    </header>
  );
}
