import type { Scale } from "../Scale";
import { fromDeltaIntervals } from "../building";
import { getModeDeltaIntervals } from "./modeDeltaIntervals";

export function mode(obj: Scale, n: number): Scale {
  const deltaIntervals = getModeDeltaIntervals(obj, n);

  return fromDeltaIntervals(...deltaIntervals);
}
