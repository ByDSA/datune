/* eslint-disable no-restricted-syntax */
import { Key } from "../Key";
import { Chord, Chords } from "chords/chromatic";
import { Voicings } from "voicings/chromatic";

export function rootChord3(obj: Key): Chord | null {
  const { inv, TRIAD_AUGMENTED, TRIAD_DIMINISHED, TRIAD_MAJOR, TRIAD_MINOR } = Voicings;
  const voicingPriority = [
    TRIAD_MAJOR,
    TRIAD_MINOR,
    TRIAD_DIMINISHED,
    TRIAD_AUGMENTED,
  ];
  let ret = null;

  mainLoop: for (const voicing of voicingPriority) {
    for (let i = 0; i < voicing.length; i++) {
      let voicingInv = voicing;

      if (i > 0)
        voicingInv = inv(voicingInv, i);

      const chord = Chords.fromRootVoicing(obj.root, voicingInv);

      if (obj.hasChord(chord)) {
        ret = chord;

        break mainLoop;
      }
    }
  }

  return ret;
}
