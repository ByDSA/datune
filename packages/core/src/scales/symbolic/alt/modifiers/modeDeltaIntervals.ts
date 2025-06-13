import type { Scale } from "../Scale";
import type { DegreeArray } from "alt";
import { Arrays } from "datils/datatypes/arrays";

export function getModeDeltaIntervals(
  obj: Scale,
  n: number,
): DegreeArray {
  const { deltaIntervals } = obj;
  const deltaIntervalsRet: DegreeArray = [...deltaIntervals];

  if (n > 0)
    Arrays.rotateLeft(deltaIntervalsRet, n - 1);
  else if (n < 0)
    Arrays.rotateRight(deltaIntervalsRet, -n - 1);

  return deltaIntervalsRet;
}
