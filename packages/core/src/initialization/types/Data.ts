import { Data as CChord } from "initialization/chords/chromatic";
import { Data as CKey } from "initialization/keys/chromatic";
import { Data as CScale } from "initialization/scales/chromatic";

type Data = {
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

export default Data;
