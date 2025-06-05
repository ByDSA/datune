import type { Interval } from "../Interval";
import { fromInt } from "../building";

export function shiftDown(obj: Interval, interval: Interval): Interval {
  const int = +obj - +interval;

  return fromInt(int);
}
