import { Interval } from "@datune/core/intervals/alt";
import { splitArray } from "../../utils/splitArray";
import { normalizeIntervalsInput } from "../normalizeIntervalsInput";
import { parseInterval } from ".";

export function parseIntervalArray(input: string): Interval[] | null {
  const normalizedInput = normalizeIntervalsInput(input);
  const splitedStr: string[] | null = splitArray(normalizedInput);

  if (!splitedStr)
    return null;

  const intervals = parseIntervals(splitedStr);

  if (intervals)
    return intervals;

  return null;
}

function parseIntervals(values: string[]): Interval[] | null {
  const intervals: Interval[] = values.map(parseInterval)
    .filter((el) => el !== null) as Interval[];

  if (intervals.length === 0)
    return null;

  return intervals;
}
