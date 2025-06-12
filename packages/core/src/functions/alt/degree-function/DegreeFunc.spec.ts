/* eslint-disable @typescript-eslint/naming-convention */
import { Chords as C } from "chords/alt";
import { Keys as K } from "keys/alt";
import { Pitches as P } from "pitches/alt";
import { Funcs as F } from "..";

const { I, I0, V, VIm, Im } = F;
const { Am, C0, G } = C;

describe.each([
  [I, K.C, C.C],
  [Im, K.Am, Am],
  [V, K.C, G],
  [VIm, K.C, Am],
  [I0, K.C, C0],

])("getChord", (func, key, expectedChord) => {
  it(`${String(func)} of ${key} = ${String(expectedChord)}`, () => {
    const actual = func.getChord(key.root);

    expect(actual).toBe(expectedChord);
  } );
} );

const { V7ALT } = F;

describe.each([
  [V7ALT, K.C, C.fromPitches(P.G, P.B, P.Db, P.F)],
])("getChord", (func, key, expectedChord) => {
  it(`${func} of ${key} = ${expectedChord}`, () => {
    const actual = func.getChord(key.root);

    expect(actual).toBe(expectedChord);
  } );
} );
