export function escapeXml(value: string): string {
  const entities: Record<string, string> = {
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&apos;",
    '"': "&quot;",
  };

  return value.replace(/[<>&'"]/g, (character) => entities[character]);
}
