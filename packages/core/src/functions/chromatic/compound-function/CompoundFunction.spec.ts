/* eslint-disable camelcase */
import { A, A7, B, B7, C, C7, D, D7, E, E7, fromRootVoicing as CCFromRootVoicing } from "chords/chromatic";
import { V as C_V } from "degrees/chromatic";
import { C as T_C } from "keys/chromatic";
import { Ab as C_Ab, Bb as C_Bb, Db as C_Db, Eb as C_Eb, F as C_F, Gb as C_Gb } from "pitches/chromatic";
import { TestInit } from "tests";
import { SEVENTH } from "voicings/chromatic";
import { SUBV7, V, V7 } from "../degree-function";
import { from } from "./building";
import { SUBV7_II, SUBV7_III, SUBV7_IV, SUBV7_V, SUBV7_VI, V7_II, V7_III, V7_IV, V7_V, V7_VI, V_II, V_III, V_IV, V_V, V_VI } from "./constants";

TestInit.chromaticFunction();
TestInit.chromaticKey();
TestInit.chromaticChord();
describe.each([
  [V_V, V, [C_V]],
  [V7_V, V7, [C_V]],
])("constants", (func, expectedDegreeFunction, expectedDegreeChain) => {
  it(`${String(func)} degreeFunction => ${String(expectedDegreeFunction)}`, () => {
    const actual = func.degreeFunction;

    expect(actual).toBe(expectedDegreeFunction);
  } );

  it(`${String(func)} degreeChain => ${expectedDegreeChain.map(String).join("-")}`, () => {
    const actual = func.degreeChain;

    expect(actual).toStrictEqual(expectedDegreeChain);
  } );
} );

describe.each([
  [from(V, C_V), V_V],
  [from(V7, C_V), V7_V],
])("from => constants", (func, expectedCompoundFunction) => {
  it(`${String(func)} => ${String(expectedCompoundFunction)}`, () => {
    expect(func).toBe(expectedCompoundFunction);
  } );
} );

describe.each([
  [from(V7, C_V, C_V), V7, [C_V, C_V]],
])("from", (func, expectedDegreeFunction, expectedDegreeChain) => {
  it(`${String(func)} degreeFunction => ${String(expectedDegreeFunction)}`, () => {
    const actual = func.degreeFunction;

    expect(actual).toBe(expectedDegreeFunction);
  } );

  it(`${String(func)} degreeChain => ${expectedDegreeChain.map(String).join("-")}`, () => {
    const actual = func.degreeChain;

    expect(actual).toStrictEqual(expectedDegreeChain);
  } );
} );

describe.each([
  [V_V, T_C, D],
  [V7_V, T_C, D7],
  [from(V7, C_V, C_V), T_C, A7],
  [V_II, T_C, A],
  [V_III, T_C, B],
  [V_IV, T_C, C],
  [V_V, T_C, D],
  [V_VI, T_C, E],
  [V7_II, T_C, A7],
  [V7_III, T_C, B7],
  [V7_IV, T_C, C7],
  [V7_V, T_C, D7],
  [V7_VI, T_C, E7],
  [SUBV7, T_C, CCFromRootVoicing(C_Db, SEVENTH)],
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
