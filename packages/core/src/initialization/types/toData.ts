import { toData as cChord } from "initialization/chords/chromatic";
import { toData as cKey } from "initialization/keys/chromatic";
import { toData as cScale } from "initialization/scales/chromatic";
import Data from "./Data";
import Dto from "./Dto";

export default (dto: Dto): Data => ( {
  version: dto.version,
  chords: {
    chromatic: cChord(dto.chords.chromatic),
  },
  scales: {
    chromatic: cScale(dto.scales.chromatic),
  },
  keys: {
    chromatic: cKey(dto.keys.chromatic),
  },
} );
