import { cache } from "../caching/cache";
import { Dto } from "./Dto";

export function from(dto: Dto) {
  return cache.getOrCreate(dto);
}
