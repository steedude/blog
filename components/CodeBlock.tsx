"use client";

import { useRef, useState, type ComponentPropsWithoutRef } from "react";
import { useParams } from "next/navigation";

export function CodeBlock({ children, "data-raw-code": rawCode, ...props }: ComponentPropsWithoutRef<"pre"> & { "data-raw-code"?: string }) {
  const pre = useRef<HTMLPreElement>(null);
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const english = useParams<{ locale: string }>().locale === "en";
  const labels = english
    ? { idle: "Copy code", copied: "Copied", failed: "Copy failed. Select and copy the code." }
    : { idle: "複製程式碼", copied: "已複製", failed: "複製失敗，請選取程式碼後複製。" };

  async function copy() {
    try {
      const code = pre.current?.querySelector("code");
      const lines = code?.querySelectorAll("[data-line]");
      const value = rawCode ?? pre.current?.closest("figure")?.getAttribute("data-raw-code") ?? (lines?.length
        ? Array.from(lines, (line) => line.textContent ?? "").join("\n")
        : pre.current?.textContent ?? "");
      await navigator.clipboard.writeText(value);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <div className="code-block min-w-0">
      <div className="flex items-center justify-end gap-2 font-sans text-xs">
        <span role="status">{status === "idle" ? "" : labels[status]}</span>
        <button type="button" className="border border-frame bg-panel px-3 py-2" onClick={copy}>
          {labels.idle}
        </button>
      </div>
      <pre ref={pre} {...props}>{children}</pre>
    </div>
  );
}
