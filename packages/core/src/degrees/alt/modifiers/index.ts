import { fromInt as diatonicDegreeFromInt } from "degrees/diatonic";
import { Interval, toChromaticInterval } from "intervals/alt";
import { calcAlts } from "pitches/alt";
import { from } from "../building";
import toChromaticDegree from "../conversions/chromaticDegree";
import Degree from "../Degree";

export function add(obj: Degree, interval: Interval): Degree {
  const chromaticDegreeSum = toChromaticDegree(obj) + toChromaticInterval(interval);
  const diatonicDegreeInt = +obj.diatonicDegree + +interval.diatonicInterval;
  const diatonicDegree = diatonicDegreeFromInt(diatonicDegreeInt);
  const alts = calcAlts(chromaticDegreeSum, diatonicDegree);

  return from(diatonicDegree, alts);
}

export function sub(obj: Degree, interval: Interval): Degree {
  const chromaticDegreeSum = toChromaticDegree(obj) - toChromaticInterval(interval);
  const diatonicDegreeInt = +obj.diatonicDegree - +interval.diatonicInterval;
  const diatonicDegree = diatonicDegreeFromInt(diatonicDegreeInt);
  const alts = calcAlts(chromaticDegreeSum, diatonicDegree);

  return from(diatonicDegree, alts);
}
