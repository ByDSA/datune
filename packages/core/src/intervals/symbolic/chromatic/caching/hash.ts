import type { Interval } from "../Interval";

export function hash(obj: Interval): string {
  return String(+obj);
}
