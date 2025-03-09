import type { IntervalArray } from "intervals/chromatic";
import type { Scale as AScale } from "scales/alt";
import type { Scale } from "scales/chromatic";
import { Intervals as CI } from "intervals/chromatic";
import { calcIntraIntervals } from "scales/symbolic/alt/modifiers/intraIntervals";
import { fromIntraIntervals } from "./intraIntervals";

export function fromAltScale(obj: AScale): Scale {
  const chromaticIntraIntervals = calcIntraIntervals(obj).map(
    CI.fromAltInterval,
  ) as IntervalArray;

  return fromIntraIntervals(...chromaticIntraIntervals);
}
