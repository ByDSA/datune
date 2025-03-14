import type { Interval, IntervalArray, Voicing } from "alt";
import { fromRootIntervals } from "../building";

export function omit(voicing: Voicing, ...intervals: Interval[]): Voicing | null {
  let newIntervals = voicing.rootIntervals.filter(i=>!intervals.includes(i));

  if (newIntervals.length <= 1)
    return null;

  return fromRootIntervals(...newIntervals as IntervalArray);
}

export function add(voicing: Voicing, ...intervals: Interval[]): Voicing {
  let newIntervals: IntervalArray = [...voicing.rootIntervals, ...intervals];

  return fromRootIntervals(...newIntervals as IntervalArray);
}
