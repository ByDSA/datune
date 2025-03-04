import type { Degree } from "./Degree";
import { cyclicMod } from "@datune/utils";
import { Pitches } from "pitches/chromatic";

export function fromInt(n: number): Degree {
  const fixedNumber = cyclicMod(n, Pitches.NUMBER);

  return fixedNumber as Degree;
}
