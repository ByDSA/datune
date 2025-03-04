import type { IntervalArray as CIntervalArray } from "intervals/chromatic";
import type { Scale } from "../Scale";
import type { Scale as CScale } from "scales/chromatic";
import { Intervals as I } from "intervals/alt";
import { fromIntraIntervals } from "scales/symbolic/chromatic/building";
import { calcIntraIntervals } from "../modifiers";

export function toChromatic(obj: Scale): CScale {
  const chromaticIntraIntervals = calcIntraIntervals(obj).map(
    I.toChromaticInterval,
  ) as CIntervalArray;

  return fromIntraIntervals(...chromaticIntraIntervals);
}
