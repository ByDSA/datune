import type { Scale } from "../Scale";
import { DegreeArray, Degrees } from "degrees/alt";
import { IntervalArray } from "intervals/alt";
import { fromRootIntervals } from "./rootIntervals";

export function fromDegrees(...degrees: DegreeArray): Scale {
  const rootIntervals = degrees.map(Degrees.toInterval) as IntervalArray;
  const scale = fromRootIntervals(...rootIntervals);

  return scale;
}
