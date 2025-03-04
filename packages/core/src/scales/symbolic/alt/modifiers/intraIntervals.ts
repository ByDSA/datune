import type { Scale } from "../Scale";
import type { IntervalArray } from "intervals/alt";

export function calcIntraIntervals(obj: Scale): IntervalArray {
  return (obj as any).intraIntervals;
}
