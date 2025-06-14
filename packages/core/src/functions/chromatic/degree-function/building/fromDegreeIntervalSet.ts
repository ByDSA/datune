import type { DegreeFunc } from "../DegreeFunc";
import type { Degree } from "chromatic";
import type { IntervalSet } from "chromatic";
import { cache } from "../caching/cache";

export function fromDegreeIntervalSet(degree: Degree, intervalSet: IntervalSet): DegreeFunc {
  return cache.getOrCreate( {
    degree,
    intervalSet,
  } );
}
