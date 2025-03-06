import { Pitches as P, Voicings as V, Chords as C, Scales as S, Keys as K } from "chromatic";
import { expectChord } from "chords/octave/chromatic/tests/chord";
import { rootChord4 } from "./rootChord4";

describe.each([
  [K.C, C.CMaj7],
  [K.Am, C.Am7],
  [K.from(P.C, S.LOCRIAN), C.fromRootVoicing(P.C, V.SEVENTH_MINOR_b5)],
  [K.from(P.C, S.ORIENTAL), null],
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
