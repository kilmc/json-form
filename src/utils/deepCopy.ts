export function deepCopy<T extends object>(source: T): T {
  return JSON.parse(JSON.stringify(source));
}
