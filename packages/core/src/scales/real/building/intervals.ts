import { IntervalArray } from "intervals/real";
import { Scale } from "../Scale";
import { cache } from "./cache";

export function fromIntervals(...intervals: IntervalArray): Scale {
  return cache.getOrCreate(intervals);
}
