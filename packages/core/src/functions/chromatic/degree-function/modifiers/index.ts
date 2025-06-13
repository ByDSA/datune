import type { DegreeFunc } from "../DegreeFunc";
import { type Voicing, type Degree, type Interval } from "chromatic";
import { shift as shiftInterval, shiftDown as shiftDownInterval, cyclicOctave } from "intervals/symbolic/chromatic/modifiers";
import { fromDegreeVoicing } from "../building/fromDegreeVoicing";

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
  return fromDegreeVoicing(newDegree, obj.voicing);
}

export function voicing(obj: DegreeFunc, newVoicing: Voicing): DegreeFunc {
  return fromDegreeVoicing(obj.baseDegree, newVoicing);
}
