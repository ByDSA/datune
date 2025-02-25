import { abs as diatonicAbs } from "intervals/diatonic";
import { fromIntervalQuality } from "../building";
import Interval from "../Interval";

export default function abs(obj: Interval): Interval {
  return fromIntervalQuality(
    diatonicAbs(obj.diatonicInterval),
    obj.quality,
  ) as Interval;
}
