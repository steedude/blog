import type { ReactNode } from "react";

type PageHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
};

export function PageHeading({ eyebrow, title, description }: PageHeadingProps) {
  return (
    <header className="mb-6 flex flex-col items-start gap-1 border-b-4 border-double border-neutral-500 pb-3 md:flex-row md:items-end md:justify-between md:gap-6">
      <div>
        <p className="m-0 text-xs tracking-wider text-muted">{eyebrow}</p>
        <h1 className="mt-0 mb-1 font-serif text-2xl leading-tight">{title}</h1>
      </div>
      {description && <p className="m-0 max-w-2xl text-muted">{description}</p>}
    </header>
  );
}
