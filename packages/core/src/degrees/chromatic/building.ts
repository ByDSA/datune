/* eslint-disable import/prefer-default-export */
import { cyclicMod } from "@datune/utils";
import { NUMBER } from "pitches/chromatic";
import Degree from "./Degree";

export function fromInt(n: number): Degree {
  const fixedNumber = cyclicMod(n, NUMBER);

  return fixedNumber as Degree;
}
