import { Chord } from "../Chord";
import { C } from "../constants";
import { toVoicing } from "../conversions";
import { inv } from ".";
import { Voicings, Voicing } from "voicings/chromatic";
import { TestInit } from "tests";

TestInit.chromaticChord();

describe.each([
  [C, Voicings.TRIAD_MAJOR],
  [inv(C, 2), Voicings.inv(Voicings.TRIAD_MAJOR, 2)],
  [inv(C), Voicings.inv(Voicings.TRIAD_MAJOR)],
])("inv voicing", (chord: Chord, voicing: Voicing) => {
  it(`${chord} => ${voicing}`, () => {
    expect(voicing).toBe(toVoicing(chord));
  } );
} );
