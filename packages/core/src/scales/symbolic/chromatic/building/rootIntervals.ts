import type { Scale } from "../Scale";
import type { IntervalArray } from "intervals/chromatic";
import { cache } from "../caching/cache";

export function fromRootIntervals(...rootIntervals: IntervalArray): Scale {
  return cache.getOrCreate(rootIntervals);
}
