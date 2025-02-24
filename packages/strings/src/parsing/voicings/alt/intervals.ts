import { Array as IntervalArray } from "@datune/core/intervals/alt";
import parseIntervals from "parsing/intervals/alt/array";
import { fromRootIntervals, Voicing } from "@datune/core/voicings/alt";

export default function fromIntervals(strValue: string): Voicing | null {
  const intervals = parseIntervals(strValue);

  if (intervals)
    return fromRootIntervals(...intervals as IntervalArray);

  return null;
}
