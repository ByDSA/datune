import type { Dto } from "../caching/Dto";
import type { DegreeFunction } from "../DegreeFunction";
import { cache } from "../caching/cache";

export function from(dto: Dto): DegreeFunction {
  return cache.getOrCreate(dto);
}
