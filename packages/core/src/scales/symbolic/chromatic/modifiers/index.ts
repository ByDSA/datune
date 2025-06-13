import type { Scale } from "../Scale";
import type { DegreeArray } from "chromatic";
import { Arrays } from "datils/datatypes/arrays";
import { fromIntraIntervals } from "../building";
import { calcIntraIntervals } from "./intraIntervals";

export function mode(
  obj: Scale,
  n: number,
): Scale {
  const intraIntervals = getModeIntraIntervals(obj, n);

  return fromIntraIntervals(...intraIntervals);
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

export function getModeIntraIntervals(
  obj: Scale,
  n: number,
): DegreeArray {
  const intervals: DegreeArray = [...calcIntraIntervals(obj)];

  if (n > 0)
    Arrays.rotateLeft(intervals, n - 1);
  else if (n < 0)
    Arrays.rotateRight(intervals, -n - 1);

  return intervals;
}
