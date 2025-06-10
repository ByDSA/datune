import type { Interval } from "../Interval";
import { cyclicMod } from "datils/math";
import { NUMBER as DNUMBER } from "pitches/diatonic/constants";
import { cache } from "../caching/cache";
import { Direction } from "../Direction";

export function simplify(obj: Interval): Interval {
  return cache.getOrCreate( {
    magnitude: obj.magnitude % DNUMBER,
    direction: obj.direction,
  } );
}

export function cyclicOctave(obj: Interval): Interval {
  const magnitude = cyclicMod(+obj, DNUMBER);

  return cache.getOrCreate( {
    magnitude,
    direction: Direction.ASCENDENT,
  } );
}
