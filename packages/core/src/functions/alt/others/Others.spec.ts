import { initialize, V7ALT } from "./constants";
import { Chords } from "chords/alt";
import { Keys as K } from "keys/alt";
import { Pitches as P } from "pitches/alt";
import { TestInit } from "tests";

initialize();
TestInit.diatonicAltKey();
TestInit.diatonicAltChord();

describe("tests", () => {
  describe.each([
    [V7ALT, K.C, Chords.fromPitches(P.G, P.B, P.Db, P.F)],
  ])("getChord", (func, key, expectedChord) => {
    it(`${func} of ${key} = ${expectedChord}`, () => {
      const actual = func.getChord(key);

      expect(actual).toBe(expectedChord);
    } );
  } );
} );
