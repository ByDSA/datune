import type { Pitch } from "pitches/chromatic";
import type { Voicing } from "voicings/chromatic";
import type { Chord } from "../../Chord";
import { Pitches as P } from "pitches/chromatic";
import { TestInit } from "tests";
import { Voicings as V } from "voicings/chromatic";
import { Am, C, C7, C9, CMaj7 } from "../../constants";
import { toVoicing } from "../../conversions";
import { fromRootVoicing } from ".";

TestInit.chromaticChord();

describe("tests", () => {
  const { NINTH, SEVENTH, SEVENTH_MAJ7, TRIAD_MAJOR, TRIAD_MINOR } = V;

  describe.each([
    [P.C, TRIAD_MAJOR, C],
    [P.C, SEVENTH, C7],
    [P.A, TRIAD_MINOR, Am],
    [P.C, SEVENTH_MAJ7, CMaj7],
    [P.C, NINTH, C9],
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
