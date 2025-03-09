import type { Degree } from "../Degree";
import { cyclicMod } from "@datune/utils";
import { NUMBER } from "pitches/chromatic/constants";

export function fromInt(n: number): Degree {
  const fixedNumber = cyclicMod(n, NUMBER);

  return fixedNumber as Degree;
}
