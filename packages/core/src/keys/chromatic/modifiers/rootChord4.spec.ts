import { TestInit } from "tests";
import { Chords as C } from "chords/chromatic";
import { Pitches as P, Voicings as V } from "chromatic";
import { Scales as S } from "chromatic";
import { expectChord } from "chords/octave/chromatic/tests/chord";
import { Keys as K } from "..";
import { rootChord4 } from "./rootChord4";

TestInit.chromaticKey();
TestInit.chromaticVoicing();
TestInit.chromaticChord();

describe.each([
  [K.C, C.CMaj7],
  [K.Am, C.Am7],
  [K.fromRootScale(P.C, S.LOCRIAN), C.fromRootVoicing(P.C, V.SEVENTH_MINOR_b5)],
  [K.fromRootScale(P.C, S.ORIENTAL), null],
])("rootChord4", (k, c)=> {
  it(`${k} -> ${c}`, () => {
    const chord = rootChord4(k);

    if (c === null && chord === c)
      return;

    expect(c).not.toBeNull();

    expect(chord).toHaveLength(4);

    expectChord(chord, c);
  } );
} );
