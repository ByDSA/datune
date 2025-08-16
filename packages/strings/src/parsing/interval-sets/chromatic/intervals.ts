import { IntervalArray } from "@datune/core/intervals/chromatic";
import { IntervalSet } from "@datune/core/intervalSets/chromatic";
import { fromRootIntervals } from "@datune/core/intervalSets/relative/chromatic/building/rootIntervals";
import { parseIntervalArray as parseIntervals } from "parsing/intervals/chromatic/array";

export function parseFromIntervals(strValue: string): IntervalSet | null {
  const intervals = parseIntervals(strValue);

  if (intervals)
    return fromRootIntervals(...intervals as IntervalArray);

  return null;
}
