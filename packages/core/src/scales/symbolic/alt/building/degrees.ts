import { Scale } from "../Scale";
import { fromRootIntervals } from "./rootIntervals";
import { DegreeArray, Degrees } from "degrees/alt";
import { IntervalArray } from "intervals/alt";

export function fromDegrees(...degrees: DegreeArray): Scale {
  const rootIntervals = degrees.map(Degrees.toInterval) as IntervalArray;
  const scale = fromRootIntervals(...rootIntervals);

  return scale;
}
