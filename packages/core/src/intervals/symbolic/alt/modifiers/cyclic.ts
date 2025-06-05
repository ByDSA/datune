import type { Interval } from "../Interval";
import { Direction } from "intervals/symbolic/diatonic/Direction";
import { P8 } from "../constants";
import { shift } from "./shift";
import { simplify } from "./simplify";

export function cyclic(interval: Interval): Interval {
  let ret = simplify(interval);

  if (ret.diatonicInterval.direction === Direction.DESCENDENT)
    ret = shift(ret, P8) as Interval;

  return ret;
}
