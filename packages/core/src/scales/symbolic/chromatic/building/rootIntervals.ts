import { IntervalArray } from "intervals/chromatic";
import { cache } from "../caching/cache";
import { Scale } from "../Scale";

export function fromRootIntervals(...rootIntervals: IntervalArray): Scale {
  return cache.getOrCreate(rootIntervals);
}
