/* eslint-disable camelcase */
import { A as CC_A, A7 as CC_A7, B as CC_B, B7 as CC_B7, C as CC_C, C7 as CC_C7, D as CC_D, D7 as CC_D7, E as CC_E, E7 as CC_E7, fromRootVoicing as CCFromRootVoicing } from "chords/alt";
import { V as C_V } from "degrees/alt";
import { C as T_C } from "keys/alt";
import { Ab as P_Ab, Bb as P_Bb, Db as P_Db, Eb as P_Eb, F as P_F, Gb as P_Gb } from "pitches/alt";
import { TestInit } from "tests";
import { SEVENTH } from "voicings/alt";
import { SUBV7, V7 } from "../degree-function";
import { from } from "./building";
import { SUBV7_II, SUBV7_III, SUBV7_IV, SUBV7_V, SUBV7_VI, V7_II, V7_III, V7_IV, V7_V, V7_VI, V_II, V_III, V_IV, V_V, V_VI } from "./constants";

TestInit.diatonicAltFunction();
TestInit.diatonicAltKey();
TestInit.diatonicAltChord();

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
  [SUBV7, T_C, CCFromRootVoicing(P_Db, SEVENTH)],
  [SUBV7_II, T_C, CCFromRootVoicing(P_Eb, SEVENTH)],
  [SUBV7_III, T_C, CCFromRootVoicing(P_F, SEVENTH)],
  [SUBV7_IV, T_C, CCFromRootVoicing(P_Gb, SEVENTH)],
  [SUBV7_V, T_C, CCFromRootVoicing(P_Ab, SEVENTH)],
  [SUBV7_VI, T_C, CCFromRootVoicing(P_Bb, SEVENTH)],
])("getChord", (func, key, expectedChord) => {
  it(`${String(func)} of ${key} = ${expectedChord}`, () => {
    const actual = func.getChord(key);

    expect(actual).toBe(expectedChord);
  } );
} );
