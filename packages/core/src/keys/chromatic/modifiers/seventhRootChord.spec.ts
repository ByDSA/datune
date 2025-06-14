import { Pitches as P, IntervalSets as IS, Chords as C, Scales as S, Keys as K } from "chromatic";
import { expectChord } from "chords/octave/chromatic/tests/chord";
import { seventhRootChord } from "./seventhRootChord";

describe.each([
  [K.C, C.CMaj7],
  [K.Am, C.Am7],
  [K.from(P.C, S.LOCRIAN), C.fromRootIntervalSet(P.C, IS.SEVENTH_MINOR_b5)],
  [K.from(P.C, S.ORIENTAL), null],
])("seventhRootChord", (k, c)=> {
  it(`${k} -> ${c}`, () => {
    const chord = seventhRootChord(k);

    if (c === null && chord === c)
      return;

    expect(c).not.toBeNull();

    expect(chord?.size).toBe(4);

    expectChord(chord, c);
  } );
} );
