import { Array as IntervalArray } from "intervals/alt";
import parseIntervals from "parsing/intervals/alt/array";
import { fromIntraIntervals, Scale } from "scales/alt";

export default function fromIntervals(input: string): Scale | null {
  const intervals = parseIntervals(input);

  if (intervals)
    return fromIntraIntervals(...intervals as IntervalArray);

  return null;
}
