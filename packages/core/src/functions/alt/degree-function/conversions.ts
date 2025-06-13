import type { DegreeArray } from "alt";
import type { DegreeFunc } from "./DegreeFunc";
import { shift as intervalShift } from "intervals/symbolic/alt/modifiers/shift";

export function getDegrees(degreeFunc: DegreeFunc): DegreeArray {
  const ret = [];
  const initialDegree = degreeFunc.baseDegree;

  for (const rootIntervalVoicing of degreeFunc.voicing) {
    const degree = intervalShift(initialDegree, rootIntervalVoicing).withCyclicOctave();

    ret.push(degree);
  }

  return ret as DegreeArray;
}
