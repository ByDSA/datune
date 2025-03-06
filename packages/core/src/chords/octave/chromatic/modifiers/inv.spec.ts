import type { Voicing } from "voicings/chromatic";
import type { Chord } from "../Chord";
import { Voicings as V } from "voicings/chromatic";
import { Chords as C } from "..";
import { toVoicing } from "../conversions";
import { inv } from ".";

describe.each([
  [C.C, V.TRIAD_MAJOR],
  [inv(C.C, 2), V.inv(V.TRIAD_MAJOR, 2)],
  [inv(C.C), V.inv(V.TRIAD_MAJOR)],
])("inv voicing", (chord: Chord, voicing: Voicing) => {
  it(`${chord} => ${voicing}`, () => {
    expect(voicing).toBe(toVoicing(chord));
  } );
} );
