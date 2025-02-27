import { PERFECT_OCTAVE } from "../constants";
import Interval from "../Interval";
import { add } from "./add";
import { simple } from "./simple";
import Direction from "intervals/symbolic/diatonic/Direction";

export function cyclic(interval: Interval): Interval {
  let ret = simple(interval);

  if (ret.diatonicInterval.direction === Direction.DESCENDENT)
    ret = add(ret, PERFECT_OCTAVE) as Interval;

  return ret;
}
