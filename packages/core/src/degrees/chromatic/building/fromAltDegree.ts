import type { Degree as ADegree } from "../../alt/Degree";
import type { Degree } from "../Degree";
import { MAJOR_SCALE_DEGREES } from "scales/symbolic/chromatic/constants/majorScaleDegrees";
import { fromInt } from "./fromInt";

export function fromAltDegree(obj: ADegree): Degree {
  const sum = MAJOR_SCALE_DEGREES[+obj.diatonicDegree] + obj.alts;
  const chromaticDegree = fromInt(+sum);

  return chromaticDegree;
}
