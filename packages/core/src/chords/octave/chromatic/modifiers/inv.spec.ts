import type { Voicing } from "voicings/chromatic";
import type { Chord } from "../Chord";
import { Voicings as V } from "voicings/chromatic";
import { Chords as C } from "..";
import { inv } from ".";

describe.each([
  [C.C, V.TRIAD_MAJOR],
  [inv(C.C, 2), V.TRIAD_MAJOR],
  [inv(C.C), V.TRIAD_MAJOR],
])("invs have same rootIntervals voicing", (chord: Chord, voicing: Voicing) => {
  it(`${chord} => ${voicing}`, () => {
    expect(voicing).toBe(chord.toRootVoicing());
  } );
} );

describe.each([
  C.A,
  C.CMaj7,
])("keep root", (chord: Chord) => {
  it(`${chord} => ${C.A}`, () => {
    for (let i = 1; i < chord.size; i++)
      expect(chord.root).toBe(chord.withInv(i).root);
  } );
} );
