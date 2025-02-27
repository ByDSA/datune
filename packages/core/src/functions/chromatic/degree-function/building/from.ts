import { Dto } from "../caching/Dto";
import { cache } from "../caching/cache";
import { DegreeFunction } from "../DegreeFunction";

export function from(dto: Dto): DegreeFunction {
  return cache.getOrCreate(dto);
}
