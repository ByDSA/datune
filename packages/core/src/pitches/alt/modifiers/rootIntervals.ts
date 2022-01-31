import { Array as IntervalArray } from "intervals/alt";
import Array from "../Array";
import Pitch from "../Pitch";
import add from "./add";

export default function rootIntervals(root: Pitch, intervals: IntervalArray): Array {
  return intervals.map(
    (interval) => add(root, interval),
  ) as Array;
}
