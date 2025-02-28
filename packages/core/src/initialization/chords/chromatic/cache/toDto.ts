import type { Data } from "./Data";
import type { Cache } from "./Dto";
import { toDto as chordToDto } from "chords/octave/chromatic/caching/toDto";

export default (data: Data): Cache => data.map((entry) => [entry[0], chordToDto(entry[1])]);
