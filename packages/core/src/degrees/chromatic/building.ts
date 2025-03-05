import type { Degree } from "./Degree";
import { cyclicMod } from "@datune/utils";
import { Pitches as P } from "pitches/chromatic";

export function fromInt(n: number): Degree {
  const fixedNumber = cyclicMod(n, P.NUMBER);

  return fixedNumber as Degree;
}
