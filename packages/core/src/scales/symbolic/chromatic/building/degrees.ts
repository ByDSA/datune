import type { Scale } from "../Scale";
import type { Degree, DegreeArray } from "degrees/chromatic";
import type { NonEmptyArray } from "datils";
import { cache } from "../caching/cache";

export function fromDegrees(...degrees: DegreeArray | Readonly<DegreeArray>): Scale {
  const degreesCopy = [...degrees] as NonEmptyArray<Degree>;

  return cache.getOrCreate(degreesCopy.sort((a, b)=>a - b));
}
