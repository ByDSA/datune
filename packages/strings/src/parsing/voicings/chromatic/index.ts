import { IntervalSet } from "@datune/core/intervalSets/chromatic";
import { Options } from "parsing";
import { parseFromIntervals } from "./intervals";
import { parseFromName } from "./name";

export function parseIntervalSet(input: string, options?: Options): IntervalSet | null {
  let intervalSet = parseFromName(input, options);

  if (intervalSet)
    return intervalSet;

  intervalSet = parseFromIntervals(input);

  if (intervalSet)
    return intervalSet;

  return null;
}
