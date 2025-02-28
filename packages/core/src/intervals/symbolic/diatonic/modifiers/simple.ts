import { cache } from "../caching/cache";
import type { Interval } from "../Interval";
import { NUMBER as DNUMBER } from "pitches/diatonic/constants";

export function simple(obj: Interval): Interval {
  return cache.getOrCreate( {
    magnitude: obj.magnitude % DNUMBER,
    direction: obj.direction,
  } );
}
