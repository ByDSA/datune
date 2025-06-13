import type { Scale } from "../Scale";
import type { DegreeArray } from "chromatic";
import { Arrays } from "datils/datatypes/arrays";
import { fromDeltaIntervals } from "../building";
import { scaleToDeltaIntervals } from "./deltaIntervals";

export function mode(
  obj: Scale,
  n: number,
): Scale {
  const deltaIntervals = getModeDeltaIntervals(obj, n);

  return fromDeltaIntervals(...deltaIntervals);
}

export function modes(
  obj: Scale,
): Scale[] {
  let scaleTmp: Scale = obj;
  const ret: Scale[] = [obj];

  while (true) {
    scaleTmp = mode(scaleTmp, 2);

    if (scaleTmp === obj)
      break;

    ret.push(scaleTmp);
  }

  return ret;
}

export function getModeDeltaIntervals(
  obj: Scale,
  n: number,
): DegreeArray {
  const intervals: DegreeArray = [...scaleToDeltaIntervals(obj)];

  if (n > 0)
    Arrays.rotateLeft(intervals, n - 1);
  else if (n < 0)
    Arrays.rotateRight(intervals, -n - 1);

  return intervals;
}
