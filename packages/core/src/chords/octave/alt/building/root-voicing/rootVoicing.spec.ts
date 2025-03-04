import type { Pitch } from "pitches/alt";
import { Pitches } from "pitches/alt";
import { TestInit } from "tests";
import { Voicings, Voicing } from "voicings/alt";
import { Chord } from "../../Chord";
import { Am, C as AC_C, C7, C9, CMaj7 } from "../../constants";
import { toVoicing } from "../../conversions";
import { fromRootVoicing } from ".";

TestInit.diatonicAltChord();

describe("tests", () => {
  const { NINTH, SEVENTH, SEVENTH_MAJ7, TRIAD_MAJOR, TRIAD_MINOR } = Voicings;
  const { A, C } = Pitches;

  describe.each([
    [C, TRIAD_MAJOR, AC_C],
    [C, SEVENTH, C7],
    [A, TRIAD_MINOR, Am],
    [C, SEVENTH_MAJ7, CMaj7],
    [C, NINTH, C9],
  ])("from Root + Voicing", (pitch: Pitch, voicing: Voicing, expectedChord: Chord) => {
    const pitchName = String(pitch);
    const chordName = "expectedChord.pitches";
    const voicingName = String(voicing);

    it(`(${pitchName}, ${voicingName}) => ${chordName}`, () => {
      const chord = fromRootVoicing(pitch, voicing);

      expect(chord).toBe(expectedChord);
    } );

    it(`Reversible: root=${pitchName}, voicing=${voicingName}`, () => {
      const chord = fromRootVoicing(pitch, voicing);

      expect(chord.pitches[0]).toBe(pitch);
      expect(toVoicing(chord)).toBe(voicing);
    } );
  } );
} );
