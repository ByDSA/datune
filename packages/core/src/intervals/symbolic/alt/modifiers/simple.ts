import { simple as diatonicSimple } from "intervals/diatonic";
import { fromIntervalQuality } from "../building";
import Interval from "../Interval";

export default function simple(obj: Interval): Interval {
  return fromIntervalQuality(diatonicSimple(obj.diatonicInterval), obj.quality) as Interval;
}
