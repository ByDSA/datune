/* eslint-disable camelcase */
import { fromPitches } from "chords/chromatic";
import { C as T_C } from "keys/chromatic";
import { B, Db, F, G } from "pitches/chromatic";
import { TestInit } from "tests";
import { V7ALT } from "./constants";

TestInit.chromaticFunction();
TestInit.chromaticKey();
describe.each([
  [V7ALT, T_C, fromPitches(G, B, Db, F)],
])("getChord", (func, key, expectedChord) => {
  it(`${func} of ${key} = ${expectedChord}`, () => {
    const actual = func.getChord(key);

    expect(actual).toBe(expectedChord);
  } );
} );
