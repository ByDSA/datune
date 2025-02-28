import { Chord } from "../../Chord";
import { Am, C as DAC_C, C7, C9, CMaj7 } from "../../constants";
import { toVoicing } from "../../conversions";
import { fromRootVoicing } from ".";
import { Pitches } from "pitches/alt";
import type { Pitch } from "pitches/alt";
import { TestInit } from "tests";
import { Voicings, Voicing } from "voicings/alt";

TestInit.diatonicAltChord();

describe("tests", () => {
  const { NINTH, SEVENTH, SEVENTH_MAJ7, TRIAD_MAJOR, TRIAD_MINOR } = Voicings;
  const { A, C } = Pitches;

  describe.each([
    [C, TRIAD_MAJOR, DAC_C],
    [C, SEVENTH, C7],
    [A, TRIAD_MINOR, Am],
    [C, SEVENTH_MAJ7, CMaj7],
    [C, NINTH, C9],
  ])("from Root + Voicing", (pitch: Pitch, voicing: Voicing, expectedChord: Chord) => {
    const pitchName = String(pitch);
    const chordName = "expectedChord.pitches";
    const voicingName = String(voicing);

    it(`(${pitchName}, ${voicingName}) => ${chordName}`, () => {
      const diatonicAltChord = fromRootVoicing(pitch, voicing);

      expect(diatonicAltChord).toBe(expectedChord);
    } );

    it(`Reversible: root=${pitchName}, voicing=${voicingName}`, () => {
      const chord = fromRootVoicing(pitch, voicing);

      expect(chord.pitches[0]).toBe(pitch);
      expect(toVoicing(chord)).toBe(voicing);
    } );
  } );
} );
