import { Chords as C } from "chords/chromatic";
import { Pitches as P } from "pitches/chromatic";
import { Scales as S } from "scales/chromatic";
import { TestInit } from "tests";
import { expectChord } from "chords/octave/chromatic/tests/chord";
import { Keys as K } from "..";
import { rootChord3 } from "./rootChord3";

TestInit.chromaticKey();
TestInit.chromaticVoicing();
TestInit.chromaticChord();

describe.each([
  [K.C, C.C],
  [K.Am, C.Am],
  [K.fromRootScale(P.C, S.LOCRIAN), C.C0],
  [K.fromRootScale(P.C, S.ORIENTAL), C.bass(C.Am, P.C)],
])("rootChord3", (k, c)=> {
  it(`${k} -> ${c}`, () => {
    const chord = rootChord3(k);

    expect(chord).not.toBeNull();
    expect(chord).toHaveLength(3);

    expectChord(chord, c);
  } );
} );
