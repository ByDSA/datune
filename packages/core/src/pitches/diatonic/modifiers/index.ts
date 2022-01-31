import { Interval } from "intervals/diatonic";
import { fromInt } from "../building";
import Diatonic from "../Diatonic";

export function add(obj: Diatonic, interval: Interval): Diatonic {
  const intValue = +obj + +interval;

  return fromInt(intValue);
}

export function sub(obj: Diatonic, interval: Interval): Diatonic {
  const intValue = +obj - +interval;

  return fromInt(intValue);
}
