import type { DegreeArray } from "chromatic";
import type { DegreeFunc } from "./DegreeFunc";
import { cyclicOctave, shift as intervalAdd } from "intervals/symbolic/chromatic/modifiers";

export function getDegrees(degreeFunc: DegreeFunc): DegreeArray {
  const ret = [];
  const initialDegree = degreeFunc.degree;

  for (const rootIntervalVoicing of degreeFunc.voicing) {
    const degree = cyclicOctave(intervalAdd(initialDegree, rootIntervalVoicing));

    ret.push(degree);
  }

  return ret as DegreeArray;
}
