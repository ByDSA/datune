import type { Interval } from "diatonic";
import type { IntervalSet } from "./IntervalSet";
import { cache, type Key } from "./caching";

export function fromRootIntervalsMagnitude(...ints: number[]): IntervalSet {
  const set: Key = new Set();

  for (const i of ints)
    set.add(Math.abs(i));

  return cache.getOrCreate(set);
}

export function fromRootIntervals(...rootIntervals: Interval[]): IntervalSet {
  const set: Key = new Set();

  for (const i of rootIntervals)
    set.add(i.magnitude);

  return cache.getOrCreate(set);
}
