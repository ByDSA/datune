import { Chords as CC } from "chords/alt";
import { Degrees as D } from "degrees/alt";
import { Keys as K } from "keys/alt";
import { Pitches } from "pitches/alt";
import { TestInit } from "tests";
import { Voicings } from "voicings/alt";
import * as DegreeFunctions from "../degree-function/constants";
import { SUBV7_II, SUBV7_III, SUBV7_IV, SUBV7_V, SUBV7_VI, V7_II, V7_III, V7_IV, V7_V, V7_VI, V_II, V_III, V_IV, V_V, V_VI } from "./constants";
import { compose } from "./building/compose";

TestInit.diatonicAltFunction();
TestInit.diatonicAltKey();
TestInit.diatonicAltChord();

describe("tests", () => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { fromRootVoicing: CCFromRootVoicing } = CC;
  const { SEVENTH } = Voicings;
  const { SUBV7, V7 } = DegreeFunctions;

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
    [SUBV7, K.C, CCFromRootVoicing(Pitches.Db, SEVENTH)],
    [SUBV7_II, K.C, CCFromRootVoicing(Pitches.Eb, SEVENTH)],
    [SUBV7_III, K.C, CCFromRootVoicing(Pitches.F, SEVENTH)],
    [SUBV7_IV, K.C, CCFromRootVoicing(Pitches.Gb, SEVENTH)],
    [SUBV7_V, K.C, CCFromRootVoicing(Pitches.Ab, SEVENTH)],
    [SUBV7_VI, K.C, CCFromRootVoicing(Pitches.Bb, SEVENTH)],
  ])("getChord", (func, key, expectedChord) => {
    it(`${String(func)} of ${key} = ${expectedChord}`, () => {
      const actual = func.getChord(key);

      expect(actual).toBe(expectedChord);
    } );
  } );
} );
