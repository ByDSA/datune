import type { DegreeFunc } from "../DegreeFunc";
import type { Degree, IntervalSet } from "alt";
import { cache } from "../caching/cache";

export function fromDegreeIntervalSet(degree: Degree, intervalSet: IntervalSet): DegreeFunc {
  return cache.getOrCreate( {
    degree,
    intervalSet,
  } );
}
