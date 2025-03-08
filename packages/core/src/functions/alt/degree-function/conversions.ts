import type { DegreeArray } from "alt";
import type { DegreeFunc } from "./DegreeFunc";
import { Degrees as D } from "alt";

export function getDegrees(degreeFunc: DegreeFunc): DegreeArray {
  const ret = [];
  const initialDegree = degreeFunc.degree;

  for (const rootIntervalVoicing of degreeFunc.voicing) {
    const degree = D.add(initialDegree, rootIntervalVoicing);

    ret.push(degree);
  }

  return ret as DegreeArray;
}
