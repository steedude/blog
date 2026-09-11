export function normalizeSearchText(value: string): string {
  return value.normalize("NFKC").trim().toLowerCase();
}
