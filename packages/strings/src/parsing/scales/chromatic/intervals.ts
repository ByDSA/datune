import type { Scale } from "@datune/core/scales/chromatic";
import { IntervalArray } from "@datune/core/intervals/chromatic";
import { fromIntraIntervals } from "@datune/core/scales/symbolic/chromatic/building";
import { parseIntervalArray as parseIntervals } from "parsing/intervals/chromatic/array";

export function parseFromIntervals(input: string): Scale | null {
  const intervals = parseIntervals(input);

  if (intervals)
    return fromIntraIntervals(...intervals as IntervalArray);

  return null;
}
