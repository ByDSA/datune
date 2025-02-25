import { Array as IntervalArray } from "intervals/alt";
import Scale from "../Scale";

export default function intraIntervals(obj: Scale): IntervalArray {
  return (obj as any).intraIntervals;
}
