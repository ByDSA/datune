import { Interval } from "@datune/core/intervals/chromatic";
import fromName from "./name";
import fromNumber from "./number";

export default function fromString(str: string): Interval | null {
  let interval = fromName(str);

  if (interval !== null)
    return interval;

  interval = fromNumber(str);

  if (interval !== null)
    return interval;

  return null;
}
