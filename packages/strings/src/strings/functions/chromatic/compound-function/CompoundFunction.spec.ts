import { Chords as CC } from "@datune/core/chords/chromatic";
import { Degrees as D } from "@datune/core/degrees/chromatic";
import { SUBV7_II, SUBV7_III, SUBV7_IV, SUBV7_V, SUBV7_VI, V7_II, V7_III, V7_IV, V7_V, V7_VI, V_II, V_III, V_IV, V_V, V_VI } from "@datune/core/functions/chromatic/compound-function/constants";
import { compose } from "@datune/core/functions/chromatic/compound-function/building/compose";
import { V7 } from "@datune/core/functions/chromatic/degree-function/constants";
import { Keys as K } from "@datune/core/keys/chromatic";
import { Pitches as C } from "@datune/core/pitches/chromatic";
import { Voicings as V } from "@datune/core/voicings/chromatic";
import { stringifyCompoundFunction } from ".";
import { TestInit, TestLang } from "tests";

TestInit.chromaticFunction();
TestInit.chromaticKey();
TestInit.chromaticChord();
TestLang.loadAll();

describe.each([
  [compose(V7, D.V, D.V), "V7/V/V"],
])("from", (func, expectedString) => {
  it(`${String(func)} String => ${expectedString}`, () => {
    const actual = stringifyCompoundFunction(func);

    expect(actual).toBe(expectedString);
  } );
} );

describe.each([
  [V_V, K.C, CC.D],
  [V7_V, K.C, CC.D7],
  [compose(V7, D.V, D.V), K.C, CC.A7],
  [V_II, K.C, CC.A],
  [V_III, K.C, CC.B],
  [V_IV, K.C, CC.C],
  [V_V, K.C, CC.D],
  [V_VI, K.C, CC.E],
  [V7_II, K.C, CC.A7],
  [V7_III, K.C, CC.B7],
  [V7_IV, K.C, CC.C7],
  [V7_V, K.C, CC.D7],
  [V7_VI, K.C, CC.E7],
  // [SUBV7, K.C, CC.fromRootVoicing(C.Db, V.SEVENTH)],
  [SUBV7_II, K.C, CC.fromRootVoicing(C.Eb, V.SEVENTH)],
  [SUBV7_III, K.C, CC.fromRootVoicing(C.F, V.SEVENTH)],
  [SUBV7_IV, K.C, CC.fromRootVoicing(C.Gb, V.SEVENTH)],
  [SUBV7_V, K.C, CC.fromRootVoicing(C.Ab, V.SEVENTH)],
  [SUBV7_VI, K.C, CC.fromRootVoicing(C.Bb, V.SEVENTH)],
])("getChord", (func, key, expectedChord) => {
  it(`${String(func)} of ${key} = ${expectedChord}`, () => {
    const actual = func.getChord(key);

    expect(actual).toBe(expectedChord);
  } );
} );
