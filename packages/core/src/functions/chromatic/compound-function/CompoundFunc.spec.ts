import { Chords as C } from "chords/chromatic";
import { Keys as K } from "keys/chromatic";
import { Pitches as P } from "pitches/chromatic";
import { Degrees as D } from "degrees/chromatic";
import { Voicings as V } from "chromatic";
import { Funcs as F } from "..";
import { compose } from "./building/compose";

const { SUBV7_II, SUBV7_III, SUBV7_IV, SUBV7_V, SUBV7_VI,
  V7_II, V7_III, V7_IV, V7_V, V7_VI, V_II, V_III, V_IV, V_V, V_VI, V7 } = F;
const { A, A7, B, B7, C7, D7, E, E7 } = C;

describe.each([
  [V_V, F.V, [D.V]],
  [V7_V, V7, [D.V]],
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
  [compose(F.V, D.V), V_V],
  [compose(F.V7, D.V), V7_V],
])("from => constants", (func, expectedCompoundFunction) => {
  it(`${String(func)} => ${String(expectedCompoundFunction)}`, () => {
    expect(func).toBe(expectedCompoundFunction);
  } );
} );

describe.each([
  [compose(F.V7, D.V, D.V), F.V7, [D.V, D.V]],
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
  [V_V, K.C, C.D],
  [V7_V, K.C, D7],
  [compose(F.V7, D.V, D.V), K.C, A7],
  [V_II, K.C, A],
  [V_III, K.C, B],
  [V_IV, K.C, C.C],
  [V_V, K.C, C.D],
  [V_VI, K.C, E],
  [V7_II, K.C, A7],
  [V7_III, K.C, B7],
  [V7_IV, K.C, C7],
  [V7_V, K.C, D7],
  [V7_VI, K.C, E7],
  [F.SUBV7, K.C, C.fromRootVoicing(P.Db, V.SEVENTH)],
  [SUBV7_II, K.C, C.fromRootVoicing(P.Eb, V.SEVENTH)],
  [SUBV7_III, K.C, C.fromRootVoicing(P.F, V.SEVENTH)],
  [SUBV7_IV, K.C, C.fromRootVoicing(P.Gb, V.SEVENTH)],
  [SUBV7_V, K.C, C.fromRootVoicing(P.Ab, V.SEVENTH)],
  [SUBV7_VI, K.C, C.fromRootVoicing(P.Bb, V.SEVENTH)],
])("getChord", (func, key, expectedChord) => {
  it(`${String(func)} of ${key} = ${expectedChord}`, () => {
    const actual = func.getChord(key);

    expect(actual).toBe(expectedChord);
  } );
} );
