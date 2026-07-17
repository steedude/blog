export const linkScope =
  "[&_a]:text-link [&_a]:underline [&_a]:visited:text-link-visited [&_a]:hover:text-link-hover";

export const siteShell =
  "mx-auto w-full max-w-4xl";

export const contentShell =
  "mx-auto w-full max-w-5xl";

export const pageMain = [
  contentShell,
  "min-h-screen border-y border-frame bg-white p-4 md:border-x md:p-6",
].join(" ");

export const pageHeading =
  "mb-6 flex flex-col items-start gap-1 border-b-4 border-double border-neutral-500 pb-3 md:flex-row md:items-end md:justify-between md:gap-6";

export const pageHeadingTitle =
  "mt-0 mb-1 font-serif text-2xl leading-tight";

export const pageHeadingCopy = "m-0 max-w-2xl text-muted";

export const directoryCard =
  "border border-frame bg-stone-100 p-3 no-underline hover:bg-panel";

export const directoryCardTitle =
  "mt-0 mb-2 font-serif text-lg text-link underline";

export const directoryCardMeta = "text-xs text-muted";

export const retroButton =
  "cursor-pointer rounded-none border border-neutral-400 bg-neutral-200 px-2 py-0.5 text-black";
