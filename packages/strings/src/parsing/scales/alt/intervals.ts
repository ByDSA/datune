import type { Scale } from "@datune/core/scales/alt";
import { IntervalArray } from "@datune/core/intervals/alt";
import { fromDeltaIntervals } from "@datune/core/scales/symbolic/alt/building";
import { parseIntervalArray as parseIntervals } from "parsing/intervals/alt/array";

export function parseFromIntervals(input: string): Scale | null {
  const intervals = parseIntervals(input);

  if (intervals)
    return fromDeltaIntervals(...intervals as IntervalArray);

  return null;
}
