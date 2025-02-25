import { toDto as chordToDto } from "chords/octave/chromatic/caching";
import Data from "./Data";
import Dto from "./Dto";

export default (data: Data): Dto => data.map((entry) => [entry[0], chordToDto(entry[1])]);
