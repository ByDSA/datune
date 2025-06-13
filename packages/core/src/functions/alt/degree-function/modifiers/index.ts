import type { DegreeFunc } from "../DegreeFunc";
import type { Voicing, Degree, Interval } from "alt";
import { shift as shiftInterval } from "intervals/symbolic/alt/modifiers/shift";
import { shiftDown as shiftDownInterval } from "intervals/symbolic/alt/modifiers/shiftDown";
import { fromDegreeVoicing } from "../building/fromDegreeVoicing";

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
  return fromDegreeVoicing(newDegree, obj.voicing);
}

export function voicing(obj: DegreeFunc, newVoicing: Voicing): DegreeFunc {
  return fromDegreeVoicing(obj.baseDegree, newVoicing);
}
