import type { ComponentPropsWithoutRef } from "react";
import type { MDXComponents } from "mdx/types";

function mergeClassName(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

const defaultComponents: MDXComponents = {
  h2: ({ className, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className={mergeClassName(
        "mt-8 mb-3 border-b border-neutral-400 text-xl leading-snug",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <h3 className={mergeClassName("mt-6 text-lg", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className={mergeClassName(
        "mx-2 my-6 border-l-4 border-neutral-400 px-3 py-1 text-neutral-600 sm:mx-5",
        className,
      )}
      {...props}
    />
  ),
  figure: ({ className, ...props }: ComponentPropsWithoutRef<"figure">) => (
    <figure className={mergeClassName("my-6 max-w-full min-w-0", className)} {...props} />
  ),
  pre: ({ className, ...props }: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className={mergeClassName(
        "max-w-full overflow-x-auto border border-neutral-400 bg-neutral-100 p-3 font-mono text-xs leading-normal text-black",
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: ComponentPropsWithoutRef<"code">) => (
    <code
      className={mergeClassName(
        "bg-neutral-100 px-1 py-px font-mono text-sm in-[pre]:grid in-[pre]:min-w-full in-[pre]:bg-transparent in-[pre]:p-0 in-[pre]:text-xs",
        className,
      )}
      {...props}
    />
  ),
  table: ({ className, ...props }: ComponentPropsWithoutRef<"table">) => (
    <table
      className={mergeClassName(
        "my-6 block max-w-full overflow-x-auto border-collapse font-sans text-sm",
        className,
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }: ComponentPropsWithoutRef<"th">) => (
    <th
      className={mergeClassName(
        "border border-frame bg-bar px-2 py-1 text-left font-bold",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: ComponentPropsWithoutRef<"td">) => (
    <td
      className={mergeClassName("border border-frame px-2 py-1 text-left", className)}
      {...props}
    />
  ),
  del: ({ className, ...props }: ComponentPropsWithoutRef<"del">) => (
    <del className={mergeClassName("text-muted", className)} {...props} />
  ),
  input: ({ className, ...props }: ComponentPropsWithoutRef<"input">) => (
    <input className={mergeClassName("mr-1 align-middle", className)} {...props} />
  ),
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...defaultComponents, ...components };
}
