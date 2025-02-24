import { NUMBER } from "pitches/diatonic";
import { fromInt } from "../building";
import cache from "../caching/cache";
import Direction from "../Direction";
import Interval from "../Interval";

export function add(obj: Interval, interval: Interval): Interval {
  const int = +obj + +interval;

  return fromInt(int);
}

export function sub(obj: Interval, interval: Interval): Interval {
  const int = +obj - +interval;

  return fromInt(int);
}

export function neg(obj: Interval): Interval {
  return cache.getOrCreate( {
    magnitude: obj.magnitude,
    direction: obj.direction === Direction.ASCENDENT ? Direction.DESCENDENT : Direction.ASCENDENT,
  } );
}

export function simple(obj: Interval): Interval {
  return cache.getOrCreate( {
    magnitude: obj.magnitude % NUMBER,
    direction: obj.direction,
  } );
}

export function abs(obj: Interval): Interval {
  return cache.getOrCreate( {
    magnitude: obj.magnitude,
    direction: Direction.ASCENDENT,
  } );
}
