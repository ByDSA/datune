import type { Voicing } from "../Voicing";
import { IntervalArray } from "intervals/symbolic/chromatic";
import { deltaToRootIntervals } from "intervals/symbolic/chromatic/conversions";
import { fromRootIntervals } from "./rootIntervals";

export function fromDeltaIntervals(
  ...deltaIntervals: IntervalArray
): Voicing {
  const rootIntervals = deltaToRootIntervals(...deltaIntervals);

  return fromRootIntervals(...rootIntervals);
}
