import type { Degree } from "./Degree";

export function hashCode(obj: Degree): string {
  return (+obj).toString();
}
