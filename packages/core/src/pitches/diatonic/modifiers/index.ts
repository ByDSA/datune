import type { Pitch } from "../Pitch";
import type { Interval } from "intervals/diatonic";
import { fromInt } from "../building";

export function add(obj: Pitch, interval: Interval): Pitch {
  const intValue = +obj + +interval;

  return fromInt(intValue);
}

export function sub(obj: Pitch, interval: Interval): Pitch {
  const intValue = +obj - +interval;

  return fromInt(intValue);
}
