import type { DegreeFunc } from "../DegreeFunc";
import type { DegreeArray } from "chromatic";
import { fromDegrees as intervalSetFromDegrees } from "sets/interval-sets/chromatic/building/pitches";
import { fromDegreeIntervalSet } from "./fromDegreeIntervalSet";

export function fromDegrees(...degrees: DegreeArray): DegreeFunc {
  const intervalSet = intervalSetFromDegrees(...degrees);

  return fromDegreeIntervalSet(degrees[0], intervalSet);
}
