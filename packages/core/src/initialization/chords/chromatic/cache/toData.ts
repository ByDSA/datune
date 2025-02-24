import { toObj as chordToObj } from "chords/octave/chromatic/caching";
import Data from "./Data";
import Dto from "./Dto";

export default (dto: Dto): Data => dto.map((entry) => [entry[0], chordToObj(entry[1])]);
