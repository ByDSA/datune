import type { Degree } from "../Degree";
import type { Interval } from "intervals/alt";
import { Degrees } from "degrees/diatonic";
import { Intervals as CI } from "intervals/chromatic";
import { calcAlts } from "pitches/alt/calcAlts";
import { fromAltDegree } from "../../chromatic/building/fromAltDegree";
import { from } from "../building";

export function shift(obj: Degree, interval: Interval): Degree {
  const chromaticDegreeSum = fromAltDegree(obj) + CI.fromAltInterval(interval);
  const diatonicDegreeInt = +obj.diatonicDegree + +interval.diatonicInterval;
  const diatonicDegree = Degrees.fromInt(diatonicDegreeInt);
  const alts = calcAlts(chromaticDegreeSum, diatonicDegree);

  return from(diatonicDegree, alts);
}

export function shiftDown(obj: Degree, interval: Interval): Degree {
  const chromaticDegreeSum = fromAltDegree(obj) - CI.fromAltInterval(interval);
  const diatonicDegreeInt = +obj.diatonicDegree - +interval.diatonicInterval;
  const diatonicDegree = Degrees.fromInt(diatonicDegreeInt);
  const alts = calcAlts(chromaticDegreeSum, diatonicDegree);

  return from(diatonicDegree, alts);
}
