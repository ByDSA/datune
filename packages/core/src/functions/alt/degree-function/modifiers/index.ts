import type { DegreeFunc } from "../DegreeFunc";
import type { IntervalSet, Degree, Interval } from "alt";
import { shift as shiftInterval } from "intervals/symbolic/alt/modifiers/shift";
import { shiftDown as shiftDownInterval } from "intervals/symbolic/alt/modifiers/shiftDown";
import { fromDegreeIntervalSet } from "../building/fromDegreeIntervalSet";

export function shift(obj: DegreeFunc, interval: Interval): DegreeFunc {
  const { baseDegree: oldDegree } = obj;
  const newDegree = shiftInterval(oldDegree, interval).toDegree();

  return degree(obj, newDegree);
}

export function shiftDown(obj: DegreeFunc, interval: Interval): DegreeFunc {
  const { baseDegree: oldDegree } = obj;
  const newDegree = shiftDownInterval(oldDegree, interval).toDegree();

  return degree(obj, newDegree);
}

export function degree(obj: DegreeFunc, newDegree: Degree): DegreeFunc {
  return fromDegreeIntervalSet(newDegree, obj.intervalSet);
}

export function intervalSet(obj: DegreeFunc, newIntervalSet: IntervalSet): DegreeFunc {
  return fromDegreeIntervalSet(obj.baseDegree, newIntervalSet);
}
