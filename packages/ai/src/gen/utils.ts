import { bIII, bVI, bVII, I, II, III, IV, V, VI, VII } from "@datune/core/degrees/chromatic/constants";
import { Degree as DegreeAlt } from "@datune/core/degrees/chromatic";
import { DegreeFunction } from "@datune/core/functions/chromatic";
import { MusicalDuration } from "@datune/core/time";

export const commonDegreesWith = (
  degreeFunction: DegreeFunction,
  withDegrees: DegreeAlt[],
): boolean => {
  let common = 0;

  for (const d of degreeFunction.degrees) {
    if (withDegrees.includes(d))
      common++;
  }

  if (common >= 2)
    return true;

  return false;
};

export const isTonic = (
  degreeFunction: DegreeFunction,
): boolean => commonDegreesWith(degreeFunction, [
  I,
  bIII,
  III,
  V,
]);

export const isSubDominant = (
  degreeFunction: DegreeFunction,
): boolean => commonDegreesWith(degreeFunction, [
  IV,
  bVI,
  VI,
  I,
]);

export const isDominant = (
  degreeFunction: DegreeFunction,
): boolean => commonDegreesWith(degreeFunction, [
  V,
  VII,
  bVII,
  II,
]);

export function limitTime(m: MusicalDuration, limit: MusicalDuration): MusicalDuration {
  return (Math.min(m, limit));
}
