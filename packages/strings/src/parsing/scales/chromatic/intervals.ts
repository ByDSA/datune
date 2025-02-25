import { Array as IntervalArray } from "@datune/core/intervals/chromatic";
import parseIntervals from "parsing/intervals/chromatic/array";
import { fromIntraIntervals, Scale } from "@datune/core/scales/chromatic";

export default function fromIntervals(input: string): Scale | null {
  const intervals = parseIntervals(input);

  if (intervals)
    return fromIntraIntervals(...intervals as IntervalArray);

  return null;
}
