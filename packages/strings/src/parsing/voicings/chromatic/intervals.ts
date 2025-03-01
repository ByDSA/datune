import { IntervalArray } from "@datune/core/intervals/chromatic";
import { Voicing } from "@datune/core/voicings/chromatic";
import { fromRootIntervals } from "@datune/core/voicings/relative/chromatic/building/rootIntervals";
import { parseIntervalArray as parseIntervals } from "parsing/intervals/chromatic/array";

export function parseFromIntervals(strValue: string): Voicing | null {
  const intervals = parseIntervals(strValue);

  if (intervals)
    return fromRootIntervals(...intervals as IntervalArray);

  return null;
}
