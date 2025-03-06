import type { PitchArray } from "../Array";
import type { Pitch } from "../Pitch";
import type { IntervalArray } from "intervals/alt";
import { add } from "./add";

export function rootIntervals(root: Pitch, intervals: IntervalArray): PitchArray {
  return intervals.map(
    (interval) => add(root, interval),
  ) as PitchArray;
}
