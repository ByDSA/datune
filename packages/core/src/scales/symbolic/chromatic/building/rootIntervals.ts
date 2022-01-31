import { Array as IntervalArray } from "intervals/chromatic";
import { cache } from "../caching";
import Scale from "../Scale";

export default function fromRootIntervals(...rootIntervals: IntervalArray): Scale {
  return cache.getOrCreate(rootIntervals);
}
