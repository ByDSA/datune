import type { Interval } from "../Interval";
import type { Degree } from "alt";
import { Direction } from "intervals/symbolic/diatonic/Direction";
import { neg as negDInterval } from "intervals/symbolic/diatonic/modifiers/neg";
import { P8 } from "../constants";
import { fromIntervalQuality } from "../building/intervalQuality";
import { neg as negQuality } from "../quality/conversions/neg";
import { shift } from "./shift";
import { simplify } from "./simplify";

export function cyclicOctave(interval: Interval): Degree {
  let ret = simplify(interval);
  const { direction, magnitude } = ret.diatonicInterval;

  if (direction === Direction.DESCENDENT && magnitude > 0)
    ret = shift(ret, P8);

  if (ret.diatonicInterval.direction === Direction.DESCENDENT)
    ret = fromIntervalQuality(negDInterval(ret.diatonicInterval), negQuality(ret.quality))!;

  return ret;
}
