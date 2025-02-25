import { A as P_A, C as P_C, Pitch } from "pitches/chromatic";
import { TestInit } from "tests";
import { NINTH, SEVENTH, SEVENTH_MAJ7, TRIAD_MAJOR, TRIAD_MINOR, Voicing } from "voicings/chromatic";
import fromRootVoicing from ".";
import Chord from "../../Chord";
import { Am, C, C7, C9, CMaj7 } from "../../constants";
import { toVoicing } from "../../conversions";

TestInit.chromaticChord();

describe.each([
  [P_C, TRIAD_MAJOR, C],
  [P_C, SEVENTH, C7],
  [P_A, TRIAD_MINOR, Am],
  [P_C, SEVENTH_MAJ7, CMaj7],
  [P_C, NINTH, C9],
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
