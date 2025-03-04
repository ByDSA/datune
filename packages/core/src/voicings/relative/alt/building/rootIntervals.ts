import type { Voicing } from "../Voicing";
import { IntervalArray } from "intervals/alt";
import { cache } from "../caching/cache";

export function fromRootIntervals(...rootIntervals: IntervalArray): Voicing {
  return cache.getOrCreate(rootIntervals);
}
