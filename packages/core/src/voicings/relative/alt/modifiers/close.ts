import type { IntervalArray } from "intervals/alt";
import type { Voicing } from "voicings/alt";
import { Intervals } from "intervals/alt";
import { fromRootIntervals } from "../building";

export function close(voicing: Voicing): Voicing {
  const rootIntervals = voicing.rootIntervals
    .map(Intervals.simplify)
    .sort((a, b)=>+a - +b) as IntervalArray;

  return fromRootIntervals(...rootIntervals);
}
