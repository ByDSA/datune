import type { Scale } from "../Scale";
import { IntervalArray } from "intervals/real";
import { cache } from "./cache";

export function fromIntervals(...intervals: IntervalArray): Scale {
  return cache.getOrCreate(intervals);
}
