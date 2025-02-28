import { Dto as CChord } from "initialization/chords/chromatic";
import { Dto as CKey } from "initialization/keys/chromatic";
import { Dto as CScale } from "initialization/scales/chromatic";

export type Dto = {
  version: string;
  chords: {
    chromatic: CChord;
  };
  scales: {
    chromatic: CScale;
  };
  keys: {
    chromatic: CKey;
  };
};
