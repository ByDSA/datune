import { fromInt } from "../building";
import type { Interval } from "../Interval";

export function add(obj: Interval, interval: Interval): Interval {
  const int = +obj + +interval;

  return fromInt(int);
}
