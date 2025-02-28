import { fromInt } from "../building";
import type { Pitch } from "../Pitch";
import type { Interval } from "intervals/chromatic";

export function add(obj: Pitch, interval: Interval): Pitch {
  const intValue = +obj + interval;

  return fromInt(intValue);
}
