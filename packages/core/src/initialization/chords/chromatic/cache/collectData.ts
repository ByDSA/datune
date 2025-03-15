import type { Data } from "./Data";
import { cache } from "chords/octave/chromatic/caching/cache";

export default (): Data => cache.exportEntries();
