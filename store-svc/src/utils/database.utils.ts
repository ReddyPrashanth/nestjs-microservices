export function getUniqueViolationKey(detail: string) {
  const matched = detail.match(/\(([^)]+)\)/g);
  return matched[1];
}
