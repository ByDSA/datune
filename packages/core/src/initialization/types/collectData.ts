import { collectData as cChord } from "initialization/chords/chromatic";
import { collectData as cKey } from "initialization/keys/chromatic";
import { collectData as cScale } from "initialization/scales/chromatic";
import Data from "./Data";
import { CURRENT_DATA_VERSION } from "./utils";

export default (): Data => ( {
  version: CURRENT_DATA_VERSION,
  chords: {
    chromatic: cChord(),
  },
  scales: {
    chromatic: cScale(),
  },
  keys: {
    chromatic: cKey(),
  },
} );
