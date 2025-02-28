import type { Data } from "./Data";
import type { Cache } from "./Dto";
import { toObj as chordToObj } from "chords/octave/chromatic/caching/toObj";

export default (dto: Cache): Data => dto.map((entry) => [entry[0], chordToObj(entry[1])]);
