import { PERFECT_OCTAVE } from "../constants";
import type { Interval } from "../Interval";
import { add } from "./add";
import { simplify } from "./simplify";
import { Direction } from "intervals/symbolic/diatonic/Direction";

export function cyclic(interval: Interval): Interval {
  let ret = simplify(interval);

  if (ret.diatonicInterval.direction === Direction.DESCENDENT)
    ret = add(ret, PERFECT_OCTAVE) as Interval;

  return ret;
}
