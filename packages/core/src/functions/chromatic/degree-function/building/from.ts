import type { Dto } from "../caching/Dto";
import type { DegreeFunc } from "../DegreeFunc";
import { cache } from "../caching/cache";

export function from(dto: Dto): DegreeFunc {
  return cache.getOrCreate(dto);
}
