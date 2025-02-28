import { cyclicMod } from "@datune/utils";
import type { Degree } from "./Degree";
import { Pitches } from "pitches/chromatic";

export function fromInt(n: number): Degree {
  const fixedNumber = cyclicMod(n, Pitches.NUMBER);

  return fixedNumber as Degree;
}
