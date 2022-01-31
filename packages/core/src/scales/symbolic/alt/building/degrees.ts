import { Array as DegreeArray, toInterval } from "degrees/alt";
import { Array as IntervalArray } from "intervals/alt";
import Scale from "../Scale";
import fromRootIntervals from "./rootIntervals";

export default function fromDegrees(...degrees: DegreeArray): Scale {
  const rootIntervals = degrees.map(toInterval) as IntervalArray;
  const scale = fromRootIntervals(...rootIntervals);

  return scale;
}
