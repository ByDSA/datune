/* eslint-disable camelcase */
import { Am, C, C0, G } from "chords/alt";
import { Am as T_Am, C as T_C } from "keys/alt";
import { TestInit } from "tests";
import { Im } from ".";
import { I, I0, V, VIm } from "./constants";

TestInit.diatonicAltFunction();
TestInit.diatonicAltKey();
TestInit.diatonicAltChord();
describe.each([
  [I, T_C, C],
  [Im, T_Am, Am],
  [V, T_C, G],
  [VIm, T_C, Am],
  [I0, T_C, C0],

])("getChord", (func, key, expectedChord) => {
  it(`${String(func)} of ${key} = ${String(expectedChord)}`, () => {
    const actual = func.getChord(key);

    expect(actual).toBe(expectedChord);
  } );
} );
