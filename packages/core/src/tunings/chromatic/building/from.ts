import type { Key } from "../caching/cache";
import { cache } from "../caching/cache";

export function from(key: Key) {
  return cache.getOrCreate(key);
}
