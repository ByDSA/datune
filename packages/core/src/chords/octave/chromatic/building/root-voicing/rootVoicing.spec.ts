import type { Pitch } from "pitches/chromatic";
import type { Voicing } from "voicings/chromatic";
import type { Chord } from "../../Chord";
import { Pitches as P } from "pitches/chromatic";
import { Voicings as V } from "voicings/chromatic";
import { toVoicing } from "../../conversions";
import { Chords as C } from "../..";
import { fromRootVoicing } from ".";

const { NINTH, SEVENTH, SEVENTH_MAJ7, TRIAD_MAJOR, TRIAD_MINOR } = V;

describe.each([
  [P.C, TRIAD_MAJOR, C.C],
  [P.C, SEVENTH, C.C7],
  [P.A, TRIAD_MINOR, C.Am],
  [P.C, SEVENTH_MAJ7, C.CMaj7],
  [P.C, NINTH, C.C9],
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
