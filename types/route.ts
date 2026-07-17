export type LocaleRouteParams<T extends Record<string, string> = Record<never, never>> =
  Promise<{ locale: string } & T>;
