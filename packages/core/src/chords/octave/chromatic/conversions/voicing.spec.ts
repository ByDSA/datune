import Chord from "../Chord";
import { C, C5, C7 } from "../constants";
import { toVoicing } from ".";
import { TestInit } from "tests";
import { Voicings, Voicing } from "voicings/chromatic";

TestInit.chromaticChord();

describe("tests", () => {
  const { POWER_CHORD, SEVENTH, TRIAD_MAJOR } = Voicings;

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
} );
