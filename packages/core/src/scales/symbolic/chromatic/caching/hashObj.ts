import { hash as intervalHash } from "intervals/chromatic";
import Scale from "../Scale";

export default function hash(obj: Scale): string {
  return obj.rootIntervals.map(intervalHash).join("-");
}
