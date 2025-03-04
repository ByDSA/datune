import type { Interval } from "../Interval";
import { NUMBER as DNUMBER } from "pitches/diatonic/constants";
import { cache } from "../caching/cache";

export function simplify(obj: Interval): Interval {
  return cache.getOrCreate( {
    magnitude: obj.magnitude % DNUMBER,
    direction: obj.direction,
  } );
}
