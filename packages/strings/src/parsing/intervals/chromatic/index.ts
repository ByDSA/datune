import { Interval } from "@datune/core/intervals/chromatic";
import { parseFromName } from "./name";
import { parseFromNumber } from "./number";

export function parseInterval(str: string): Interval | null {
  let interval = parseFromName(str);

  if (interval !== null)
    return interval;

  interval = parseFromNumber(str);

  if (interval !== null)
    return interval;

  return null;
}

export {
  parseIntervalArray,
} from "./array";
