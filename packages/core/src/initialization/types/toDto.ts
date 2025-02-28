import type { Data } from "./Data";
import type { Dto } from "./Dto";
import { CURRENT_DATA_VERSION } from "./utils";
import { toDto as cChord } from "initialization/chords/chromatic";
import { toDto as cKey } from "initialization/keys/chromatic";
import { toDto as cScale } from "initialization/scales/chromatic";

export const toDto = (data: Data): Dto => ( {
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
