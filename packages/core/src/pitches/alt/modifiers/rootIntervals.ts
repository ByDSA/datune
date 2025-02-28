import type { PitchArray } from "../Array";
import type { Pitch } from "../Pitch";
import { add } from "./add";
import { IntervalArray } from "intervals/alt";

export function rootIntervals(root: Pitch, intervals: IntervalArray): PitchArray {
  return intervals.map(
    (interval) => add(root, interval),
  ) as PitchArray;
}
