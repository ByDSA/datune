/* eslint-disable camelcase */
import { TestInit } from "tests";
import { inv as CVinv, TRIAD_MAJOR, Voicing } from "voicings/chromatic";
import { inv } from ".";
import Chord from "../Chord";
import { C } from "../constants";
import { toVoicing } from "../conversions";

TestInit.chromaticChord();
describe.each([
  [C, TRIAD_MAJOR],
  [inv(C, 2), CVinv(TRIAD_MAJOR, 2)],
  [inv(C), CVinv(TRIAD_MAJOR)],
])("inv voicing", (chord: Chord, voicing: Voicing) => {
  it(`${chord} => ${voicing}`, () => {
    expect(voicing).toBe(toVoicing(chord));
  } );
} );
