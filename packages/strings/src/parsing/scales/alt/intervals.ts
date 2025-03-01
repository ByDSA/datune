import { IntervalArray } from "@datune/core/intervals/alt";
import { Scale } from "@datune/core/scales/alt";
import { fromIntraIntervals } from "@datune/core/scales/symbolic/alt/building";
import { parseIntervalArray as parseIntervals } from "parsing/intervals/alt/array";

export function parseFromIntervals(input: string): Scale | null {
  const intervals = parseIntervals(input);

  if (intervals)
    return fromIntraIntervals(...intervals as IntervalArray);

  return null;
}
