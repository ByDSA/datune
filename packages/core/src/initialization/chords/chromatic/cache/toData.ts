import type { Data } from "./Data";
import type { Cache } from "./Dto";
import { cache } from "chords/octave/chromatic/caching/cache";

export default (dto: Cache): Data => dto.map((entry) => [entry[0], cache.getOrCreate(entry[1])]);
