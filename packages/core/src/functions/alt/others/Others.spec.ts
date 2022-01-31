/* eslint-disable camelcase */
import { fromPitches } from "chords/alt";
import { C as T_C } from "keys/alt";
import { B as C_B, Db as C_Db, F as C_F, G as C_G } from "pitches/alt";
import { TestInit } from "tests";
import { V7ALT } from "./constants";

TestInit.diatonicAltFunction();
TestInit.diatonicAltKey();
TestInit.diatonicAltChord();
describe.each([
  [V7ALT, T_C, fromPitches(C_G, C_B, C_Db, C_F)],
])("getChord", (func, key, expectedChord) => {
  it(`${func} of ${key} = ${expectedChord}`, () => {
    const actual = func.getChord(key);

    expect(actual).toBe(expectedChord);
  } );
} );
