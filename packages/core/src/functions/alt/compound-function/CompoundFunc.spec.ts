import { Chords as CC } from "chords/alt";
import { Keys as K } from "keys/alt";
import { Pitches as P } from "pitches/alt";
import { IntervalSets as IS } from "sets/interval-sets/alt";
import { Funcs as F } from "functions/alt";
import { Degrees as D } from "degrees/alt";
import { compose } from "./building/compose";

const { SUBV7_II, SUBV7_III, SUBV7_IV, SUBV7_V, SUBV7_VI,
  V7_II, V7_III, V7_IV, V7_V, V7_VI, V_II, V_III, V_IV, V_V, V_VI } = F;
const { SEVENTH } = IS;
const { SUBV7, V7 } = F;

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
  [SUBV7, K.C, CC.fromRootIntervalSet(P.Db, SEVENTH)],
  [SUBV7_II, K.C, CC.fromRootIntervalSet(P.Eb, SEVENTH)],
  [SUBV7_III, K.C, CC.fromRootIntervalSet(P.F, SEVENTH)],
  [SUBV7_IV, K.C, CC.fromRootIntervalSet(P.Gb, SEVENTH)],
  [SUBV7_V, K.C, CC.fromRootIntervalSet(P.Ab, SEVENTH)],
  [SUBV7_VI, K.C, CC.fromRootIntervalSet(P.Bb, SEVENTH)],
])("getChord", (func, key, expectedChord) => {
  it(`${String(func)} of ${key} = ${expectedChord}`, () => {
    const actual = func.getChord(key.root);

    expect(actual).toBe(expectedChord);
  } );
} );
