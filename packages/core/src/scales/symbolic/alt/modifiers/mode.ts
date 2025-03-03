import { fromIntraIntervals } from "../building";
import { Scale } from "../Scale";
import { getModeIntraIntervals } from "./modeIntraIntervals";

export function mode(obj: Scale, n: number): Scale {
  const intraIntervals = getModeIntraIntervals(obj, n);

  return fromIntraIntervals(...intraIntervals);
}
