import type { DegreeFunc } from "../DegreeFunc";
import { Degree, Voicing } from "alt";
import { cache } from "../caching/cache";

export function fromDegreeVoicing(degree: Degree, voicing: Voicing): DegreeFunc {
  return cache.getOrCreate( {
    degree,
    voicing,
  } );
}
