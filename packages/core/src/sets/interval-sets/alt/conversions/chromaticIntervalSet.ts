import type { IntervalSet } from "../IntervalSet";
import type { IntervalSet as CIS } from "../../chromatic";
import type { NonEmptyNumberArray } from "datils";
import { Intervals as CI } from "intervals/chromatic";
import { fromRootIntervals } from "../../chromatic/building/rootIntervals";

export function toChromaticIntervalSet(obj: IntervalSet): CIS {
  const arrayIntervalSet: NonEmptyNumberArray = new Array(obj.size) as NonEmptyNumberArray;

  for (let i = 0; i < obj.size; i++)
    arrayIntervalSet[i] = CI.fromAltInterval(obj.rootIntervals[i]);

  return fromRootIntervals(...arrayIntervalSet);
}
