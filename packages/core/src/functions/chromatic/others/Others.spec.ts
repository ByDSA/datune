import { Chords } from "chords/chromatic";
import { Keys as K } from "keys/chromatic";
import { Pitches } from "pitches/chromatic";
import { TestInit } from "tests";
import { V7ALT } from "./constants";

TestInit.chromaticFunc();
TestInit.chromaticKey();

describe("tests", () => {
// eslint-disable-next-line @typescript-eslint/naming-convention
  const { B, Db, F, G } = Pitches;

  describe.each([
    [V7ALT, K.C, Chords.fromPitches(G, B, Db, F)],
  ])("getChord", (func, key, expectedChord) => {
    it(`${func} of ${key} = ${expectedChord}`, () => {
      const actual = func.getChord(key);

      expect(actual).toBe(expectedChord);
    } );
  } );
} );
