import type { Voicing } from "voicings/chromatic";
import type { Spn, SpnArray } from "spns/chromatic";
import { Spns as N } from "spns/chromatic";
import { Voicings as V } from "voicings/chromatic";
import { fromSpns } from "../building";

const { TRIAD_AUGMENTED, TRIAD_DIMINISHED, TRIAD_MAJOR, TRIAD_MINOR } = V;

describe.each([
  [[N.D4, N.F4, N.A4], TRIAD_MINOR],
  [[N.C4, N.E4, N.G4], TRIAD_MAJOR],
  [[N.C4, N.DD4, N.G4], TRIAD_MINOR],
  [[N.B4, N.D5, N.F5], TRIAD_DIMINISHED],
  [[N.C4, N.E4, N.GG4], TRIAD_AUGMENTED],
])("tests", (spns: Spn[], expected: Voicing) => {
  it(`voicing (${spns}) => ${expected}`, () => {
    const chord = fromSpns(...spns as SpnArray);

    expect(chord.pitches).toStrictEqual(spns);
  } );
} );
