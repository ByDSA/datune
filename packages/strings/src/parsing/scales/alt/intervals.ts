import { Array as IntervalArray } from "@datune/core/intervals/alt";
import parseIntervals from "parsing/intervals/alt/array";
import { fromIntraIntervals, Scale } from "@datune/core/scales/alt";

export default function fromIntervals(input: string): Scale | null {
  const intervals = parseIntervals(input);

  if (intervals)
    return fromIntraIntervals(...intervals as IntervalArray);

  return null;
}
