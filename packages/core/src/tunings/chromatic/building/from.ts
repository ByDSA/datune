import type { Dto } from "../caching/Dto";
import { cache } from "../caching/cache";

export function from(dto: Dto) {
  return cache.getOrCreate(dto);
}
