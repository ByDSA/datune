import type { Scale } from "../Scale";
import { type DegreeArray } from "degrees/chromatic";
import { deltaToRootIntervals } from "intervals/symbolic/chromatic/conversions";
import { fromDegrees } from "./degrees";

export function fromDeltaIntervals(...deltaIntervals: DegreeArray): Scale {
  const rootIntervals = deltaToRootIntervals(...deltaIntervals) as DegreeArray;

  return fromDegrees(...rootIntervals);
}
