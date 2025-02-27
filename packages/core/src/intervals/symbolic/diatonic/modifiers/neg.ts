import cache from "../caching/cache";
import Direction from "../Direction";
import Interval from "../Interval";

export function neg(obj: Interval): Interval {
  return cache.getOrCreate( {
    magnitude: obj.magnitude,
    direction: obj.direction === Direction.ASCENDENT ? Direction.DESCENDENT : Direction.ASCENDENT,
  } );
}
