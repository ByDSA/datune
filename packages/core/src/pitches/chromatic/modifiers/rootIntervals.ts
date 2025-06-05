import type { PitchArray } from "../Array";
import type { Pitch } from "../Pitch";
import { IntervalArray } from "intervals/chromatic";
import { shift } from "./shift";

export function rootIntervals(root: Pitch, intervals: IntervalArray): PitchArray {
  return intervals.map(
    (interval) => shift(root, interval),
  ) as PitchArray;
}
