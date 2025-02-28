import { cache } from "../caching/cache";
import type { Voicing } from "../Voicing";
import { IntervalArray } from "intervals/alt";

export function fromRootIntervals(...rootIntervals: IntervalArray): Voicing {
  return cache.getOrCreate(rootIntervals);
}
