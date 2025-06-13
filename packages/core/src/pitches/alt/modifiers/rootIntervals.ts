import type { PitchArray } from "../Array";
import type { Pitch } from "../Pitch";
import type { IntervalArray } from "intervals/alt";
import { shift } from "./shift";

export function rootIntervals(
  root: Pitch,
  intervals: IntervalArray | Readonly<IntervalArray>,
): PitchArray {
  return intervals.map(
    (interval) => shift(root, interval),
  ) as PitchArray;
}
