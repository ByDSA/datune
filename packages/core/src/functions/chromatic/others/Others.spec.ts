import { Chords as C } from "chords/chromatic";
import { Keys as K } from "keys/chromatic";
import { Pitches as P } from "pitches/chromatic";
import { Funcs as F } from "../";

// eslint-disable-next-line @typescript-eslint/naming-convention
const { B, Db, G } = P;

describe.each([
  [F.V7ALT, K.C, C.fromPitches(G, B, Db, P.F)],
])("getChord", (func, key, expectedChord) => {
  it(`${func} of ${key} = ${expectedChord}`, () => {
    const actual = func.getChord(key);

    expect(actual).toBe(expectedChord);
  } );
} );
