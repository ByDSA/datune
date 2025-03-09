import type { Voicing } from "voicings/chromatic";
import type { Chord } from "../../../../chords/octave/chromatic/Chord";
import { Chords as C } from "chords/octave/chromatic";
import { Voicings as V } from "..";
import { fromChord } from "./fromChord";

const { POWER_CHORD, SEVENTH, TRIAD_MAJOR } = V;

describe.each([
  [C.C5, POWER_CHORD],
  [C.C, TRIAD_MAJOR],
  [C.C7, SEVENTH],
])("fromChord", (chord: Chord, voicing: Voicing) => {
  it(`${chord} => ${voicing}`, () => {
    const actual = fromChord(chord);

    expect(actual).toBe(voicing);
  } );
} );
