import type { Scale } from "../Scale";
import type { DegreeArray } from "degrees/chromatic";
import { type IntervalArray } from "intervals/chromatic";
import { P8 } from "intervals/symbolic/chromatic/constants";
import { rootToDeltaIntervals } from "intervals/symbolic/chromatic/conversions";

export function scaleToDeltaIntervals(obj: Scale): DegreeArray {
  const rootIntervals: IntervalArray = [...obj.degrees, P8];

  return rootToDeltaIntervals(...rootIntervals) as DegreeArray;
}
