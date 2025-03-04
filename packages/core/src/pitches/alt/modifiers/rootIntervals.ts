import type { PitchArray } from "../Array";
import type { Pitch } from "../Pitch";
import { IntervalArray } from "intervals/alt";
import { add } from "./add";

export function rootIntervals(root: Pitch, intervals: IntervalArray): PitchArray {
  return intervals.map(
    (interval) => add(root, interval),
  ) as PitchArray;
}
