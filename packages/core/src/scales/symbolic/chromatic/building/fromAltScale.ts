import type { Scale as AScale } from "scales/alt";
import type { Scale } from "scales/chromatic";
import type { DegreeArray } from "chromatic";
import { Intervals as CI } from "intervals/chromatic";
import { fromDeltaIntervals } from "./deltaIntervals";

export function fromAltScale(obj: AScale): Scale {
  const chromaticDeltaIntervals = obj.deltaIntervals.map(
    CI.fromAltInterval,
  ) as DegreeArray;

  return fromDeltaIntervals(...chromaticDeltaIntervals);
}
