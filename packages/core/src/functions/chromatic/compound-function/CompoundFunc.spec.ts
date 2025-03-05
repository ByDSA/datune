import { Chords } from "chords/chromatic";
import { Keys as K } from "keys/chromatic";
import { Pitches } from "pitches/chromatic";
import { TestInit } from "tests";
import { Voicings } from "voicings/chromatic";
import { Degrees } from "degrees/chromatic";
import * as DegreeFuncs from "../degree-function/constants";
import { SUBV7_II, SUBV7_III, SUBV7_IV, SUBV7_V, SUBV7_VI, V7_II, V7_III, V7_IV, V7_V, V7_VI, V_II, V_III, V_IV, V_V, V_VI } from "./constants";
import { compose } from "./building/compose";

TestInit.chromaticFunc();
TestInit.chromaticKey();
TestInit.chromaticChord();

describe("tests", () => {
// eslint-disable-next-line @typescript-eslint/naming-convention
  const { A, A7, B, C, B7, C7, D, D7, E, E7, fromRootVoicing: CCFromRootVoicing } = Chords;
  const { SUBV7, V, V7 } = DegreeFuncs;

  describe.each([
    [V_V, V, [Degrees.V]],
    [V7_V, V7, [Degrees.V]],
  ])("constants", (func, expectedDegreeFunction, expectedDegreeChain) => {
    it(`${String(func)} degreeFunction => ${String(expectedDegreeFunction)}`, () => {
      const actual = func.degreeFunc;

      expect(actual).toBe(expectedDegreeFunction);
    } );

    it(`${String(func)} degreeChain => ${expectedDegreeChain.map(String).join("-")}`, () => {
      const actual = func.degreeChain;

      expect(actual).toStrictEqual(expectedDegreeChain);
    } );
  } );

  describe.each([
    [compose(V, Degrees.V), V_V],
    [compose(V7, Degrees.V), V7_V],
  ])("from => constants", (func, expectedCompoundFunction) => {
    it(`${String(func)} => ${String(expectedCompoundFunction)}`, () => {
      expect(func).toBe(expectedCompoundFunction);
    } );
  } );

  describe.each([
    [compose(V7, Degrees.V, Degrees.V), V7, [Degrees.V, Degrees.V]],
  ])("from", (func, expectedDegreeFunction, expectedDegreeChain) => {
    it(`${String(func)} degreeFunction => ${String(expectedDegreeFunction)}`, () => {
      const actual = func.degreeFunc;

      expect(actual).toBe(expectedDegreeFunction);
    } );

    it(`${String(func)} degreeChain => ${expectedDegreeChain.map(String).join("-")}`, () => {
      const actual = func.degreeChain;

      expect(actual).toStrictEqual(expectedDegreeChain);
    } );
  } );

  describe.each([
    [V_V, K.C, D],
    [V7_V, K.C, D7],
    [compose(V7, Degrees.V, Degrees.V), K.C, A7],
    [V_II, K.C, A],
    [V_III, K.C, B],
    [V_IV, K.C, C],
    [V_V, K.C, D],
    [V_VI, K.C, E],
    [V7_II, K.C, A7],
    [V7_III, K.C, B7],
    [V7_IV, K.C, C7],
    [V7_V, K.C, D7],
    [V7_VI, K.C, E7],
    [SUBV7, K.C, CCFromRootVoicing(Pitches.Db, Voicings.SEVENTH)],
    [SUBV7_II, K.C, CCFromRootVoicing(Pitches.Eb, Voicings.SEVENTH)],
    [SUBV7_III, K.C, CCFromRootVoicing(Pitches.F, Voicings.SEVENTH)],
    [SUBV7_IV, K.C, CCFromRootVoicing(Pitches.Gb, Voicings.SEVENTH)],
    [SUBV7_V, K.C, CCFromRootVoicing(Pitches.Ab, Voicings.SEVENTH)],
    [SUBV7_VI, K.C, CCFromRootVoicing(Pitches.Bb, Voicings.SEVENTH)],
  ])("getChord", (func, key, expectedChord) => {
    it(`${String(func)} of ${key} = ${expectedChord}`, () => {
      const actual = func.getChord(key);

      expect(actual).toBe(expectedChord);
    } );
  } );
} );
