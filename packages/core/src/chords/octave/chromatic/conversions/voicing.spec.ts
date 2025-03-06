import type { Voicing } from "voicings/chromatic";
import type { Chord } from "../Chord";
import { Voicings as V } from "voicings/chromatic";
import { Chords as C } from "..";
import { toVoicing } from ".";

const { POWER_CHORD, SEVENTH, TRIAD_MAJOR } = V;

describe.each([
  [C.C5, POWER_CHORD],
  [C.C, TRIAD_MAJOR],
  [C.C7, SEVENTH],
])("voicing", (chord: Chord, voicing: Voicing) => {
  it(`${chord} => ${voicing}`, () => {
    const actual = toVoicing(chord);

    expect(actual).toBe(voicing);
  } );
} );
