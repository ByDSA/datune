import type { Pitch } from "../Pitch";
import type { Interval } from "intervals/diatonic";
import { fromInt } from "../building";

export function shift(obj: Pitch, interval: Interval): Pitch {
  const intValue = +obj + +interval;

  return fromInt(intValue);
}

export function shiftDown(obj: Pitch, interval: Interval): Pitch {
  const intValue = +obj - +interval;

  return fromInt(intValue);
}
