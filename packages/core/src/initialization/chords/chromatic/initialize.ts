import { cache } from "chords/octave/chromatic/caching";
import Data from "./Data";

export default function initialize(data: Data) {
  cache.initialize(data.cache);
}
