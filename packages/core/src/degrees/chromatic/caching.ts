import type { Degree } from "./Degree";

export function hash(obj: Degree): string {
  return String(+obj);
}
