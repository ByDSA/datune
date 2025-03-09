import type { DegreeArray } from "chromatic";
import type { DegreeFunc } from "./DegreeFunc";
import { add as degreeAdd } from "degrees/chromatic/modifiers";

export function getDegrees(degreeFunc: DegreeFunc): DegreeArray {
  const ret = [];
  const initialDegree = degreeFunc.degree;

  for (const rootIntervalVoicing of degreeFunc.voicing) {
    const degree = degreeAdd(initialDegree, rootIntervalVoicing);

    ret.push(degree);
  }

  return ret as DegreeArray;
}
