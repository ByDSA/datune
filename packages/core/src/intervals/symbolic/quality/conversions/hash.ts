import type { Quality } from "../Quality";

export function hash(obj: Quality): string {
  return String(obj);
}
