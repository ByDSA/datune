import { toChromaticInterval } from "intervals/alt";
import { Array as ChromaticIntervalArray } from "intervals/chromatic";
import { fromIntraIntervals as chromaticScaleFromIntraIntervals, Scale as ChromaticScale } from "scales/chromatic";
import { calcIntraIntervals } from "../modifiers";
import Scale from "../Scale";

export default function toChromatic(obj: Scale): ChromaticScale {
  const chromaticIntraIntervals = calcIntraIntervals(obj).map(
    toChromaticInterval,
  ) as ChromaticIntervalArray;

  return chromaticScaleFromIntraIntervals(...chromaticIntraIntervals);
}
