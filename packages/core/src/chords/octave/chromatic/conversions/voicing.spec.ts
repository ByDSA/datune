/* eslint-disable camelcase */
import { TestInit } from "tests";
import { POWER_CHORD, SEVENTH, TRIAD_MAJOR, Voicing } from "voicings/chromatic";
import { toVoicing } from ".";
import Chord from "../Chord";
import { C, C5, C7 } from "../constants";

TestInit.chromaticChord();
describe.each([
  [C5, POWER_CHORD],
  [C, TRIAD_MAJOR],
  [C7, SEVENTH],
])("voicing", (chord: Chord, voicing: Voicing) => {
  it(`${chord} => ${voicing}`, () => {
    const actual = toVoicing(chord);

    expect(actual).toBe(voicing);
  } );
} );
