import type { DegreeFunc } from "../DegreeFunc";
import type { Degree } from "chromatic";
import type { Voicing } from "chromatic";
import { cache } from "../caching/cache";

export function fromDegreeVoicing(degree: Degree, voicing: Voicing): DegreeFunc {
  return cache.getOrCreate( {
    degree,
    voicing,
  } );
}
