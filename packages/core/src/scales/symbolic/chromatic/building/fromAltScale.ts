import type { Scale as AScale } from "scales/alt";
import type { Scale } from "scales/chromatic";
import type { DegreeArray } from "chromatic";
import { Intervals as CI } from "intervals/chromatic";
import { fromIntraIntervals } from "./intraIntervals";

export function fromAltScale(obj: AScale): Scale {
  const chromaticIntraIntervals = obj.intraIntervals.map(
    CI.fromAltInterval,
  ) as DegreeArray;

  return fromIntraIntervals(...chromaticIntraIntervals);
}
