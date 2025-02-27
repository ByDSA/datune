import type { Scale } from "../Scale";
import { IntervalArray } from "intervals/alt";

export function calcIntraIntervals(obj: Scale): IntervalArray {
  return (obj as any).intraIntervals;
}
