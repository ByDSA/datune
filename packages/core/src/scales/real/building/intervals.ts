import { Scale } from "../Scale";
import { cache } from "./cache";
import { IntervalArray } from "intervals/real";

export function fromIntervals(...intervals: IntervalArray): Scale {
  return cache.getOrCreate(intervals);
}
