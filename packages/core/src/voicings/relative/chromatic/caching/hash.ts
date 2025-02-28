import type { Voicing } from "../Voicing";
import { hash as hashInterval } from "intervals/symbolic/chromatic/caching/hash";

export function hash(obj: Voicing): string {
  return `(${obj.rootIntervals.map(hashInterval).join("-")})`;
}
