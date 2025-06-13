import type { Scale } from "../Scale";
import { fromIntraIntervals } from "../building";
import { getModeIntraIntervals } from "./modeIntraIntervals";

export function mode(obj: Scale, n: number): Scale {
  const intraIntervals = getModeIntraIntervals(obj, n);

  return fromIntraIntervals(...intraIntervals);
}
