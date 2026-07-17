import type { ComponentType } from "react";
import ModernCssEn, { metadata as modernCssEnMetadata } from "@/content/posts/modern-css/en.mdx";
import ModernCssZh, { metadata as modernCssZhMetadata } from "@/content/posts/modern-css/zh-TW.mdx";
import ReactCompilerEn, { metadata as reactCompilerEnMetadata } from "@/content/posts/react-compiler/en.mdx";
import ReactCompilerZh, { metadata as reactCompilerZhMetadata } from "@/content/posts/react-compiler/zh-TW.mdx";
import ServerComponentsEn, { metadata as serverComponentsEnMetadata } from "@/content/posts/server-components-retrospective/en.mdx";
import ServerComponentsZh, { metadata as serverComponentsZhMetadata } from "@/content/posts/server-components-retrospective/zh-TW.mdx";
import ViewTransitionsEn, { metadata as viewTransitionsEnMetadata } from "@/content/posts/view-transitions/en.mdx";
import ViewTransitionsZh, { metadata as viewTransitionsZhMetadata } from "@/content/posts/view-transitions/zh-TW.mdx";
import WebPlatformBaselineEn, { metadata as webPlatformBaselineEnMetadata } from "@/content/posts/web-platform-baseline/en.mdx";
import WebPlatformBaselineZh, { metadata as webPlatformBaselineZhMetadata } from "@/content/posts/web-platform-baseline/zh-TW.mdx";
import WebVitalsEn, { metadata as webVitalsEnMetadata } from "@/content/posts/web-vitals/en.mdx";
import WebVitalsZh, { metadata as webVitalsZhMetadata } from "@/content/posts/web-vitals/zh-TW.mdx";
import { Locale } from "@/types/i18n";
import type { Post, PostMetadata } from "@/types/post";

function createPost(
  locale: Locale,
  Body: ComponentType,
  metadata: PostMetadata,
): Post {
  return { ...metadata, locale, Body };
}

export const posts: Post[] = [
  createPost(Locale.ZH_TW, ReactCompilerZh, reactCompilerZhMetadata),
  createPost(Locale.EN, ReactCompilerEn, reactCompilerEnMetadata),
  createPost(Locale.ZH_TW, ViewTransitionsZh, viewTransitionsZhMetadata),
  createPost(Locale.EN, ViewTransitionsEn, viewTransitionsEnMetadata),
  createPost(Locale.ZH_TW, ModernCssZh, modernCssZhMetadata),
  createPost(Locale.EN, ModernCssEn, modernCssEnMetadata),
  createPost(Locale.ZH_TW, ServerComponentsZh, serverComponentsZhMetadata),
  createPost(Locale.EN, ServerComponentsEn, serverComponentsEnMetadata),
  createPost(Locale.ZH_TW, WebVitalsZh, webVitalsZhMetadata),
  createPost(Locale.EN, WebVitalsEn, webVitalsEnMetadata),
  createPost(Locale.ZH_TW, WebPlatformBaselineZh, webPlatformBaselineZhMetadata),
  createPost(Locale.EN, WebPlatformBaselineEn, webPlatformBaselineEnMetadata),
];
