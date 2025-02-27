import { Array } from "../Array";
import Pitch from "../Pitch";
import add from "./add";
import { IntervalArray } from "intervals/chromatic";

export default function rootIntervals(root: Pitch, intervals: IntervalArray): Array {
  return intervals.map(
    (interval) => add(root, interval),
  ) as Array;
}
