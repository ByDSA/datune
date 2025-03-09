import type { Interval } from "./Interval";
import { NUMBER as CNUMBER } from "pitches/chromatic/constants/Number";

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
  return obj % CNUMBER;
}

export function octaves(obj: Interval): Interval {
  return Math.trunc(obj / CNUMBER);
}

export function abs(obj: Interval): Interval {
  return Math.abs(obj);
}
