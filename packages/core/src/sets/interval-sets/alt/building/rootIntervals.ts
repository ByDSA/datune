import type { Interval } from "intervals/alt";
import type { IntervalSet } from "../IntervalSet";
import { cache } from "../caching/cache";

export function fromRootIntervals(
  ...rootIntervals: Interval[]
): IntervalSet {
  let set = new Set(rootIntervals);

  return cache.getOrCreate(set);
}
