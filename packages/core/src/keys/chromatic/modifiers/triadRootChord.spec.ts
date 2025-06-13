import { Chords as C } from "chords/chromatic";
import { Pitches as P } from "pitches/chromatic";
import { Scales as S } from "scales/chromatic";
import { expectChord } from "chords/octave/chromatic/tests/chord";
import { Keys as K } from "..";
import { triadRootChord } from "./triadRootChord";

describe.each([
  [K.C, C.C],
  [K.Am, C.Am],
  [K.from(P.C, S.LOCRIAN), C.C0],
  [K.from(P.C, S.ORIENTAL), C.bass(C.Am, P.C).withRoot(P.C)],
])("triadRootChord", (k, c)=> {
  it(`${k} -> ${c}`, () => {
    const chord = triadRootChord(k);

    expect(chord).not.toBeNull();
    expect(chord?.size).toBe(3);

    expectChord(chord, c);
  } );
} );
