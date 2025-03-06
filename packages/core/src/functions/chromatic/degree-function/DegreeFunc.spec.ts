/* eslint-disable @typescript-eslint/naming-convention */
import { Chords as C } from "chords/chromatic";
import { Keys as K } from "keys/chromatic";
import { Funcs as F } from "..";

const { Am, C0, G } = C;
const { I, I0, V, VIm, Im } = F;

describe.each([
  [I, K.C, C.C],
  [Im, K.Am, Am],
  [V, K.C, G],
  [VIm, K.C, Am],
  [I0, K.C, C0],

])("getChord", (func, key, expectedChord) => {
  it(`${String(func)} of ${key} = ${String(expectedChord)}`, () => {
    const actual = func.getChord(key);

    expect(actual).toBe(expectedChord);
  } );
} );
