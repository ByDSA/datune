import { Chords } from "chords/chromatic";
import { Keys as K } from "keys/chromatic";
import { TestInit } from "tests";
import { I, I0, V, VIm, Im } from "./constants";

TestInit.chromaticFunction();
TestInit.chromaticKey();
TestInit.chromaticChord();

describe("tests", () => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { Am, C, C0, G } = Chords;

  describe.each([
    [I, K.C, C],
    [Im, K.Am, Am],
    [V, K.C, G],
    [VIm, K.C, Am],
    [I0, K.C, C0],

  ])("getChord", (func, key, expectedChord) => {
    it(`${String(func)} of ${key} = ${String(expectedChord)}`, () => {
      const actual = func.getChord(key);

      expect(actual).toBe(expectedChord);
    } );
  } );
} );
