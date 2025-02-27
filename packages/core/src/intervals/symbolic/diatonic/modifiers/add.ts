import { fromInt } from "../building";
import Interval from "../Interval";

export function add(obj: Interval, interval: Interval): Interval {
  const int = +obj + +interval;

  return fromInt(int);
}
