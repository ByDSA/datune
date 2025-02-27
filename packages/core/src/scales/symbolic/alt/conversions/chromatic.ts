import { calcIntraIntervals } from "../modifiers";
import { Scale } from "../Scale";
import { Intervals } from "intervals/alt";
import { IntervalArray as ChromaticIntervalArray } from "intervals/chromatic";
import { Scales as CScales, Scale as ChromaticScale } from "scales/chromatic";

export function toChromatic(obj: Scale): ChromaticScale {
  const chromaticIntraIntervals = calcIntraIntervals(obj).map(
    Intervals.toChromaticInterval,
  ) as ChromaticIntervalArray;

  return CScales.fromIntraIntervals(...chromaticIntraIntervals);
}
