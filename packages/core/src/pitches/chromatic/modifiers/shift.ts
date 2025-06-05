import type { Pitch } from "../Pitch";
import type { Interval } from "intervals/chromatic";
import { fromInt } from "../building/int";

export function shift(pitch: Pitch, interval: Interval): Pitch {
  const intValue = +pitch + interval;

  return fromInt(intValue);
}
