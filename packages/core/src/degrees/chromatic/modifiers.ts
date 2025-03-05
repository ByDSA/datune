import type { Degree } from "./Degree";
import type { Interval } from "intervals/chromatic";
import { cyclicMod } from "@datune/utils";
import { Pitches as P } from "pitches/chromatic";

export function add(degree: Degree, interval: Interval): Degree {
  const fixedNumber = cyclicMod(degree + interval, P.NUMBER);

  return fixedNumber as Degree;
}

export function sub(degree: Degree, interval: Interval): Degree {
  return add(degree, -interval);
}
