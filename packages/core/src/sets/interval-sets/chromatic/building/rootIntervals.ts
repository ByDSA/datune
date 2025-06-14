import type { IntervalSet } from "../IntervalSet";
import type { Interval } from "chromatic";
import { cache, type Key } from "../caching/cache";

export function fromRootIntervals(...rootIntervals: Interval[]): IntervalSet {
  const set: Key = new Set();

  for (const i of rootIntervals)
    set.add(Math.abs(i));

  return cache.getOrCreate(set);
}
