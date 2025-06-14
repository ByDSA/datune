import type { IntervalSet } from "../IntervalSet";
import { IntervalArray } from "intervals/alt";
import { deltaToRootIntervals } from "intervals/symbolic/alt/deltaRootIntervals";
import { fromRootIntervals } from "./rootIntervals";

export function fromDeltaIntervals(
  ...deltaIntervals: IntervalArray
): IntervalSet {
  const rootIntervals = deltaToRootIntervals(...deltaIntervals);

  return fromRootIntervals(...rootIntervals);
}
