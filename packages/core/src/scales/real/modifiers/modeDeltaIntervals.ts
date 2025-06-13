import type { IntervalArray } from "intervals/real";
import type { Scale } from "../Scale";
import { Arrays } from "datils/datatypes/arrays";
import { calcDeltaIntervals } from "./deltaIntervals";

export function getModeDeltaIntervals(
  obj: Scale,
  n: number,
): IntervalArray {
  const deltaIntervalsBase = calcDeltaIntervals(obj);
  const deltaIntervalsRet: IntervalArray = [...deltaIntervalsBase];

  if (n > 0)
    Arrays.rotateLeft(deltaIntervalsRet, n - 1);
  else if (n < 0)
    Arrays.rotateRight(deltaIntervalsRet, -n - 1);

  return deltaIntervalsRet;
}
