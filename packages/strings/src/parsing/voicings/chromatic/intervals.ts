import { Array as IntervalArray } from "@datune/core/intervals/chromatic";
import parseIntervals from "parsing/intervals/chromatic/array";
import { fromRootIntervals, Voicing } from "@datune/core/voicings/chromatic";

export default function fromIntervals(strValue: string): Voicing | null {
  const intervals = parseIntervals(strValue);

  if (intervals)
    return fromRootIntervals(...intervals as IntervalArray);

  return null;
}
