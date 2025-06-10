import type { Scale } from "../Scale";
import type { DegreeArray } from "degrees/alt";
import type { IntervalArray } from "intervals/alt";
import { fromRootIntervals } from "./rootIntervals";

export function fromDegrees(...degrees: DegreeArray): Scale {
  const rootIntervals = degrees as IntervalArray;
  const scale = fromRootIntervals(...rootIntervals);

  return scale;
}
