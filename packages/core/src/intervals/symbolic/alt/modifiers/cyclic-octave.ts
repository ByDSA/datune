import type { Interval } from "../Interval";
import { cyclicMod } from "datils/math";
import { type Degree } from "alt";
import { Direction } from "intervals/symbolic/diatonic/Direction";
import { neg as negDInterval } from "intervals/symbolic/diatonic/modifiers/neg";
import { P8 } from "../constants";
import { fromIntervalQuality } from "../building/intervalQuality";
import { neg as negQuality } from "../quality/conversions/neg";
import { fromChromaticInterval } from "../building/fromCInterval";
import { shift } from "./shift";
import { simplify } from "./simplify";

export function cyclicOctave(interval: Interval): Interval {
  let ret = simplify(interval);
  const { direction, magnitude } = ret.diatonicInterval;

  if (direction === Direction.DESCENDENT && magnitude > 0)
    ret = shift(ret, P8);

  if (ret.diatonicInterval.direction === Direction.DESCENDENT)
    ret = fromIntervalQuality(negDInterval(ret.diatonicInterval), negQuality(ret.quality))!;

  return ret;
}

export function degree(interval: Interval): Degree {
  const ret = cyclicOctave(interval);
  const cInterval = +ret;

  if (cInterval < 0 || cInterval >= 12)
    return fixDegreeInverval(cInterval);

  return ret as Degree;
}

function fixDegreeInverval(cInterval: number): Degree {
  const validChromaticInterval = cyclicMod(cInterval, 12);

  return fromChromaticInterval(validChromaticInterval) as Degree;
}
