import { toDto as cChord } from "initialization/chords/chromatic";
import { toDto as cKey } from "initialization/keys/chromatic";
import { toDto as cScale } from "initialization/scales/chromatic";
import Data from "./Data";
import Dto from "./Dto";
import { CURRENT_DATA_VERSION } from "./utils";

export default (data: Data): Dto => ( {
  version: CURRENT_DATA_VERSION,
  chords: {
    chromatic: cChord(data.chords.chromatic),
  },
  scales: {
    chromatic: cScale(data.scales.chromatic),
  },
  keys: {
    chromatic: cKey(data.keys.chromatic),
  },
} );
