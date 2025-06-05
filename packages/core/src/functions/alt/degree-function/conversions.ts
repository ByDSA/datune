import type { DegreeArray } from "alt";
import type { DegreeFunc } from "./DegreeFunc";
import { shift as aAdd } from "degrees/alt/modifiers";

export function getDegrees(degreeFunc: DegreeFunc): DegreeArray {
  const ret = [];
  const initialDegree = degreeFunc.degree;

  for (const rootIntervalVoicing of degreeFunc.voicing) {
    const degree = aAdd(initialDegree, rootIntervalVoicing);

    ret.push(degree);
  }

  return ret as DegreeArray;
}
