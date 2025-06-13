import type { Scale } from "../Scale";
import type { DegreeArray } from "alt";
import { Arrays } from "datils/datatypes/arrays";

export function getModeIntraIntervals(
  obj: Scale,
  n: number,
): DegreeArray {
  const { intraIntervals } = obj;
  const intervals: DegreeArray = [...intraIntervals];

  if (n > 0)
    Arrays.rotateLeft(intervals, n - 1);
  else if (n < 0)
    Arrays.rotateRight(intervals, -n - 1);

  return intervals;
}
