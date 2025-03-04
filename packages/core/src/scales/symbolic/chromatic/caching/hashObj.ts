import { hash as hashInterval } from "intervals/symbolic/chromatic/caching/hash";
import { Scale } from "../Scale";

export function hash(obj: Scale): string {
  return obj.rootIntervals.map(hashInterval).join("-");
}
