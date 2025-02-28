import type { Data } from "./Data";
import { cache } from "scales/symbolic/chromatic/caching/cache";

export default function initialize(data: Data) {
  cache.initialize(data.cache);
}
