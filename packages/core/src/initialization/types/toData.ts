import type { Data } from "./Data";
import type { Dto } from "./Dto";
import { toData as cChord } from "initialization/chords/chromatic";
import { toData as cKey } from "initialization/keys/chromatic";
import { toData as cScale } from "initialization/scales/chromatic";

export const deserialize = (dto: Dto): Data => ( {
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
