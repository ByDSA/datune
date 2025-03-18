import type { Degree } from "../Degree";
import { cyclicMod } from "datils/math";
import { NUMBER } from "pitches/chromatic/constants";

export function fromInt(n: number): Degree {
  const fixedNumber = cyclicMod(n, NUMBER);

  return fixedNumber as Degree;
}
