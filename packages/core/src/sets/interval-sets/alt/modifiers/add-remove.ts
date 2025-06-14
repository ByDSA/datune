import type { Interval, IntervalSet } from "alt";
import { cache } from "../caching/cache";

export function remove(intervalSet: IntervalSet, ...rootIntervals: Interval[]): IntervalSet {
  const set = new Set(intervalSet.rootIntervals);

  for (const i of rootIntervals)
    set.delete(i);

  return cache.getOrCreate(set);
}

export function add(intervalSet: IntervalSet, ...rootIntervals: Interval[]): IntervalSet {
  const set = new Set([...intervalSet.rootIntervals, ...rootIntervals]);

  return cache.getOrCreate(set);
}
