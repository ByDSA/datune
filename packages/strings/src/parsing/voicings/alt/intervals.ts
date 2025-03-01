import { IntervalArray } from "@datune/core/intervals/alt";
import { Voicing } from "@datune/core/voicings/alt";
import { fromRootIntervals } from "@datune/core/voicings/relative/alt/building/rootIntervals";
import { parseIntervalArray as parseIntervals } from "parsing/intervals/alt/array";

export function parseFromIntervals(strValue: string): Voicing | null {
  const intervals = parseIntervals(strValue);

  if (intervals)
    return fromRootIntervals(...intervals as IntervalArray);

  return null;
}
