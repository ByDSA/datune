import { NUMBER } from "pitches/chromatic";
import Interval from "./Interval";

export function add(obj: Interval, interval: Interval): Interval {
  return obj + interval;
}

export function sub(obj: Interval, interval: Interval): Interval {
  return obj - interval;
}

export function neg(obj: Interval): Interval {
  return -obj;
}

export function simplify(obj: Interval): Interval {
  return obj % NUMBER;
}

export function octaves(obj: Interval): Interval {
  return Math.trunc(obj / NUMBER);
}

export function abs(obj: Interval): Interval {
  return Math.abs(obj);
}
