import type { Data } from "./Data";
import { cache } from "keys/chromatic/caching/cache";

export default function initialize(data: Data) {
  cache.initialize(data.cache);
}
