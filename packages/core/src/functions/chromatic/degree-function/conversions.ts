import type { DegreeArray } from "chromatic";
import type { DegreeFunc } from "./DegreeFunc";
import { cyclicOctave, shift as intervalAdd } from "intervals/symbolic/chromatic/modifiers";

export function getDegrees(degreeFunc: DegreeFunc): DegreeArray {
  const ret = [];
  const initialDegree = degreeFunc.baseDegree;

  for (const rootIntervalIntervalSet of degreeFunc.intervalSet) {
    const degree = cyclicOctave(intervalAdd(initialDegree, rootIntervalIntervalSet));

    ret.push(degree);
  }

  return ret as DegreeArray;
}
