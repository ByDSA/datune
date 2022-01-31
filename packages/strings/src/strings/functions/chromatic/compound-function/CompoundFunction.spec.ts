/* eslint-disable camelcase */
import { A as CC_A, A7 as CC_A7, B as CC_B, B7 as CC_B7, C as CC_C, C7 as CC_C7, D as CC_D, D7 as CC_D7, E as CC_E, E7 as CC_E7, fromRootVoicing as CCFromRootVoicing } from "chords/chromatic";
import { V as C_V } from "degrees/chromatic";
import { from, SUBV7_II, SUBV7_III, SUBV7_IV, SUBV7_V, SUBV7_VI, V7_II, V7_III, V7_IV, V7_V, V7_VI, V_II, V_III, V_IV, V_V, V_VI } from "functions/chromatic/compound-function";
import { V7 } from "functions/chromatic/degree-function";
import { C as T_C } from "keys/chromatic";
import { Ab as C_Ab, Bb as C_Bb, Eb as C_Eb, F as C_F, Gb as C_Gb } from "pitches/chromatic";
import { TestInit, TestLang } from "tests";
import { SEVENTH } from "voicings/chromatic";
import stringify from ".";

TestInit.chromaticFunction();
TestInit.chromaticKey();
TestInit.chromaticChord();
TestLang.loadAll();
describe.each([
  [from(V7, C_V, C_V), "V7/V/V"],
])("from", (func, expectedString) => {
  it(`${String(func)} String => ${expectedString}`, () => {
    const actual = stringify(func);

    expect(actual).toBe(expectedString);
  } );
} );

describe.each([
  [V_V, T_C, CC_D],
  [V7_V, T_C, CC_D7],
  [from(V7, C_V, C_V), T_C, CC_A7],
  [V_II, T_C, CC_A],
  [V_III, T_C, CC_B],
  [V_IV, T_C, CC_C],
  [V_V, T_C, CC_D],
  [V_VI, T_C, CC_E],
  [V7_II, T_C, CC_A7],
  [V7_III, T_C, CC_B7],
  [V7_IV, T_C, CC_C7],
  [V7_V, T_C, CC_D7],
  [V7_VI, T_C, CC_E7],
  // [SUBV7, T_C, CCFromRootVoicing(C_Db, SEVENTH)],
  [SUBV7_II, T_C, CCFromRootVoicing(C_Eb, SEVENTH)],
  [SUBV7_III, T_C, CCFromRootVoicing(C_F, SEVENTH)],
  [SUBV7_IV, T_C, CCFromRootVoicing(C_Gb, SEVENTH)],
  [SUBV7_V, T_C, CCFromRootVoicing(C_Ab, SEVENTH)],
  [SUBV7_VI, T_C, CCFromRootVoicing(C_Bb, SEVENTH)],
])("getChord", (func, key, expectedChord) => {
  it(`${String(func)} of ${key} = ${expectedChord}`, () => {
    const actual = func.getChord(key);

    expect(actual).toBe(expectedChord);
  } );
} );
