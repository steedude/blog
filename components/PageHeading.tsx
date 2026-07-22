import type { ReactNode } from "react";

type PageHeadingProps = {
  title: ReactNode;
};

export function PageHeading({ title }: PageHeadingProps) {
  return (
    <header className="mb-6 border-b-4 border-double border-neutral-500 pb-3">
      <h1 className="m-0 font-serif text-2xl leading-tight">{title}</h1>
    </header>
  );
}
