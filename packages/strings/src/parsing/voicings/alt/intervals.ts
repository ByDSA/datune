import { IntervalArray } from "@datune/core/intervals/alt";
import { IntervalSet } from "@datune/core/intervalSets/alt";
import { fromRootIntervals } from "@datune/core/intervalSets/relative/alt/building/rootIntervals";
import { parseIntervalArray as parseIntervals } from "parsing/intervals/alt/array";

export function parseFromIntervals(strValue: string): IntervalSet | null {
  const intervals = parseIntervals(strValue);

  if (intervals)
    return fromRootIntervals(...intervals as IntervalArray);

  return null;
}
