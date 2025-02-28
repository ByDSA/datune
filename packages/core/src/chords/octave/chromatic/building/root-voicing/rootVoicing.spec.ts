import { Chord } from "../../Chord";
import { Am, C, C7, C9, CMaj7 } from "../../constants";
import { toVoicing } from "../../conversions";
import { fromRootVoicing } from ".";
import { Pitches, Pitch } from "pitches/chromatic";
import { TestInit } from "tests";
import { Voicings, Voicing } from "voicings/chromatic";

TestInit.chromaticChord();

describe("tests", () => {
  const { NINTH, SEVENTH, SEVENTH_MAJ7, TRIAD_MAJOR, TRIAD_MINOR } = Voicings;

  describe.each([
    [Pitches.C, TRIAD_MAJOR, C],
    [Pitches.C, SEVENTH, C7],
    [Pitches.A, TRIAD_MINOR, Am],
    [Pitches.C, SEVENTH_MAJ7, CMaj7],
    [Pitches.C, NINTH, C9],
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
