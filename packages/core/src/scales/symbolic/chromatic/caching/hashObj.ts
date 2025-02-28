import { Scale } from "../Scale";
import { hash as hashInterval } from "intervals/symbolic/chromatic/caching/hash";

export function hash(obj: Scale): string {
  return obj.rootIntervals.map(hashInterval).join("-");
}
