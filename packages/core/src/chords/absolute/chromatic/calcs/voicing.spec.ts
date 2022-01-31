import { A4, Array, B4, C4, D4, D5, DD4, E4, F4, F5, G4, GG4, SPN } from "spns/chromatic";
import { TestInit } from "tests";
import { TRIAD_AUGMENTED, TRIAD_DIMINISHED, TRIAD_MAJOR, TRIAD_MINOR, Voicing } from "voicings/chromatic";
import { fromSPNs } from "../building";

TestInit.chromaticSPN();
TestInit.chromaticVoicing();

describe.each([
  [[D4, F4, A4], TRIAD_MINOR],
  [[C4, E4, G4], TRIAD_MAJOR],
  [[C4, DD4, G4], TRIAD_MINOR],
  [[B4, D5, F5], TRIAD_DIMINISHED],
  [[C4, E4, GG4], TRIAD_AUGMENTED],
])("tests", (spns: SPN[], expected: Voicing) => {
  it(`voicing (${spns}) => ${expected}`, () => {
    const chord = fromSPNs(...spns as Array);

    expect(chord.pitches).toStrictEqual(spns);
  } );
} );
