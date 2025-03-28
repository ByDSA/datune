import type { Interval } from "../Interval";
import { cache } from "../caching/cache";
import { Direction } from "../Direction";

export function abs(obj: Interval): Interval {
  return cache.getOrCreate( {
    magnitude: obj.magnitude,
    direction: Direction.ASCENDENT,
  } );
}
