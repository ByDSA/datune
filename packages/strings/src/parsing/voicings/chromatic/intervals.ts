import { Array as IntervalArray } from "intervals/chromatic";
import parseIntervals from "parsing/intervals/chromatic/array";
import { fromRootIntervals, Voicing } from "voicings/chromatic";

export default function fromIntervals(strValue: string): Voicing | null {
  const intervals = parseIntervals(strValue);

  if (intervals)
    return fromRootIntervals(...intervals as IntervalArray);

  return null;
}
