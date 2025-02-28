import type { Data } from "./Data";
import { cache } from "chords/octave/chromatic/caching/cache";

export default function initialize(data: Data) {
  cache.initialize(data.cache);
}
