import type { DegreeFunc } from "../DegreeFunc";
import { type IntervalSet, type Degree, type Interval } from "chromatic";
import { shift as shiftInterval, shiftDown as shiftDownInterval, cyclicOctave } from "intervals/symbolic/chromatic/modifiers";
import { fromDegreeIntervalSet } from "../building/fromDegreeIntervalSet";

export function shift(obj: DegreeFunc, interval: Interval): DegreeFunc {
  const { baseDegree: oldDegree } = obj;
  const newDegree = cyclicOctave(shiftInterval(oldDegree, interval)) as Degree;

  return baseDegree(obj, newDegree);
}

export function shiftDown(obj: DegreeFunc, interval: Interval): DegreeFunc {
  const { baseDegree: oldDegree } = obj;
  const newDegree = cyclicOctave(shiftDownInterval(oldDegree, interval)) as Degree;

  return baseDegree(obj, newDegree);
}

export function baseDegree(obj: DegreeFunc, newDegree: Degree): DegreeFunc {
  return fromDegreeIntervalSet(newDegree, obj.intervalSet);
}

export function intervalSets(obj: DegreeFunc, newIntervalSet: IntervalSet): DegreeFunc {
  return fromDegreeIntervalSet(obj.baseDegree, newIntervalSet);
}
