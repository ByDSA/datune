import type { Scale } from "../Scale";
import { IntervalArray } from "intervals/real";
import { cache } from "./cache";

export function fromRootIntervals(...intervals: IntervalArray): Scale {
  return cache.getOrCreate(intervals);
}
