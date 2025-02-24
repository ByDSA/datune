/* eslint-disable import/prefer-default-export */
import { cyclicMod } from "@datune/utils";
import { Interval } from "intervals/chromatic";
import { NUMBER } from "pitches/chromatic";
import Degree from "./Degree";

export function add(obj: Degree, interval: Interval): Degree {
  const fixedNumber = cyclicMod(obj + interval, NUMBER);

  return fixedNumber as Degree;
}

export function sub(obj: Degree, interval: Interval): Degree {
  return add(obj, -interval);
}
