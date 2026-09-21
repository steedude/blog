import type { ComponentType } from "react";
import { topicPosts } from "@/data/topic-posts";
import WorkersCacheEn, { metadata as workersCacheEnMetadata } from "@/content/posts/workers-cache/en.mdx";
import WorkersCacheZh, { metadata as workersCacheZhMetadata } from "@/content/posts/workers-cache/zh-TW.mdx";
import ServerComponentsEn, { metadata as serverComponentsEnMetadata } from "@/content/posts/server-components-retrospective/en.mdx";
import ServerComponentsZh, { metadata as serverComponentsZhMetadata } from "@/content/posts/server-components-retrospective/zh-TW.mdx";
import AwsOctoberOutageEn, { metadata as awsOctoberOutageEnMetadata } from "@/content/posts/aws-october-outage/en.mdx";
import AwsOctoberOutageZh, { metadata as awsOctoberOutageZhMetadata } from "@/content/posts/aws-october-outage/zh-TW.mdx";
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
  ...topicPosts,
  createPost(Locale.ZH_TW, WorkersCacheZh, workersCacheZhMetadata),
  createPost(Locale.EN, WorkersCacheEn, workersCacheEnMetadata),
  createPost(Locale.ZH_TW, ServerComponentsZh, serverComponentsZhMetadata),
  createPost(Locale.EN, ServerComponentsEn, serverComponentsEnMetadata),
  createPost(Locale.ZH_TW, WebVitalsZh, webVitalsZhMetadata),
  createPost(Locale.EN, WebVitalsEn, webVitalsEnMetadata),
  createPost(Locale.ZH_TW, AwsOctoberOutageZh, awsOctoberOutageZhMetadata),
  createPost(Locale.EN, AwsOctoberOutageEn, awsOctoberOutageEnMetadata),
];
