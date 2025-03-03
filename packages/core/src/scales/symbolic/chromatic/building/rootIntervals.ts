import { cache } from "../caching/cache";
import { Scale } from "../Scale";
import { IntervalArray } from "intervals/chromatic";

export function fromRootIntervals(...rootIntervals: IntervalArray): Scale {
  return cache.getOrCreate(rootIntervals);
}
