import type { DegreeArray } from "alt";
import type { DegreeFunc } from "./DegreeFunc";
import { shift as intervalShift } from "intervals/symbolic/alt/modifiers/shift";

export function getDegrees(degreeFunc: DegreeFunc): DegreeArray {
  const ret = [];
  const initialDegree = degreeFunc.baseDegree;

  for (const rootIntervalIntervalSet of degreeFunc.intervalSet) {
    const degree = intervalShift(initialDegree, rootIntervalIntervalSet).withCyclicOctave();

    ret.push(degree);
  }

  return ret as DegreeArray;
}
