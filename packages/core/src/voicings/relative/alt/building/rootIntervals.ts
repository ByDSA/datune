import cache from "../caching/cache";
import Voicing from "../Voicing";
import { IntervalArray } from "intervals/alt";

export function fromRootIntervals(...rootIntervals: IntervalArray): Voicing {
  return cache.getOrCreate(rootIntervals);
}
