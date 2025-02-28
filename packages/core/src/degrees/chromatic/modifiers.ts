import { cyclicMod } from "@datune/utils";
import type { Degree } from "./Degree";
import type { Interval } from "intervals/chromatic";
import { Pitches } from "pitches/chromatic";

export function add(obj: Degree, interval: Interval): Degree {
  const fixedNumber = cyclicMod(obj + interval, Pitches.NUMBER);

  return fixedNumber as Degree;
}

export function sub(obj: Degree, interval: Interval): Degree {
  return add(obj, -interval);
}
