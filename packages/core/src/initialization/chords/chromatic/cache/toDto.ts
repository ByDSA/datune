import type { Data } from "./Data";
import type { Cache } from "./Dto";
import { getKey as chordGetKey } from "chords/octave/chromatic/caching/cache";

export default (data: Data): Cache => data.map((entry) => [entry[0], chordGetKey(entry[1])]);
