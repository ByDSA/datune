import type { IntervalSet } from "../IntervalSet";
import { IntervalArray } from "intervals/symbolic/chromatic";
import { deltaToRootIntervals } from "intervals/symbolic/chromatic/conversions";
import { fromRootIntervals } from "./rootIntervals";

export function fromDeltaIntervals(
  ...deltaIntervals: IntervalArray
): IntervalSet {
  const rootIntervals = deltaToRootIntervals(...deltaIntervals);

  return fromRootIntervals(...rootIntervals);
}
