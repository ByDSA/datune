import type { DegreeFunc } from "../DegreeFunc";
import type { DegreeArray } from "degrees/alt";
import { IntervalSets as IS } from "sets/interval-sets/alt";
import { fromDegreeIntervalSet } from "./fromDegreeIntervalSet";

export function fromDegrees(...degrees: DegreeArray): DegreeFunc {
  const intervalSet = IS.fromDegrees(...degrees);

  return fromDegreeIntervalSet(degrees[0], intervalSet);
}
