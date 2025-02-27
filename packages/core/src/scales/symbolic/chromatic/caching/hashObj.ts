import { Intervals } from "intervals/chromatic";
import Scale from "../Scale";

export default function hash(obj: Scale): string {
  return obj.rootIntervals.map(Intervals.hash).join("-");
}
