import { neg as DNeg } from "intervals/diatonic";
import from from "../building/intervalQuality";
import Interval from "../Interval";

export default function neg(obj: Interval): Interval {
  return from(DNeg(obj.diatonicInterval), obj.quality) as Interval;
}
