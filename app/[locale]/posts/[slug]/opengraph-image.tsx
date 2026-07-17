import { ImageResponse } from "next/og";
import type { LocaleRouteParams } from "@/types/route";
import { getLocaleOrDefault } from "@/utils/locale";
import { getPost } from "@/utils/posts";

export const alt = "Frontend Observer article cover";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: LocaleRouteParams<{ slug: string }>;
}) {
  const { locale: value, slug } = await params;
  const locale = getLocaleOrDefault(value);
  const post = getPost(locale, slug);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f4f0df",
        color: "#202020",
        padding: "64px",
        border: "14px solid #8e8c73",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, color: "#555" }}>
        FRONTEND OBSERVER / {locale}
      </div>
      <div style={{ display: "flex", fontSize: 58, lineHeight: 1.2, fontWeight: 700 }}>
        {post?.title ?? "Frontend Observer"}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26 }}>
        <span>{post?.category ?? "Web Development"}</span>
        <span>前端觀察站 · Frontend Observer</span>
      </div>
    </div>,
    size,
  );
}
