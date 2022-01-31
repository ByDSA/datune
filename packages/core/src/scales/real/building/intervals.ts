import { Array as IntervalArray } from "intervals/real";
import ScalePitch from "../ScalePitch";
import cache from "./cache";

export default function fromIntervals(...intervals: IntervalArray): ScalePitch {
  return cache.getOrCreate(intervals);
}
