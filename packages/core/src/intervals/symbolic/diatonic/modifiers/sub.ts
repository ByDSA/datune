import type { Interval } from "../Interval";
import { fromInt } from "../building";

export function sub(obj: Interval, interval: Interval): Interval {
  const int = +obj - +interval;

  return fromInt(int);
}
