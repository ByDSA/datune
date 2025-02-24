/* eslint-disable no-restricted-syntax */
import { Chord, fromRootVoicing } from "chords/chromatic";
import { inv, TRIAD_AUGMENTED, TRIAD_DIMINISHED, TRIAD_MAJOR, TRIAD_MINOR } from "voicings/chromatic";
import Key from "../Key";

export default function rootChord3(obj: Key): Chord | null {
  const voicingPriority = [
    TRIAD_MAJOR,
    TRIAD_MINOR,
    TRIAD_DIMINISHED,
    TRIAD_AUGMENTED,
  ];
  let ret = null;

  // eslint-disable-next-line no-restricted-syntax
  // eslint-disable-next-line no-labels
  mainLoop: for (const voicing of voicingPriority) {
    for (let i = 0; i < voicing.length; i++) {
      let voicingInv = voicing;

      if (i > 0)
        voicingInv = inv(voicingInv, i);

      const chord = fromRootVoicing(obj.root, voicingInv);

      if (obj.hasChord(chord)) {
        ret = chord;
        // eslint-disable-next-line no-labels
        break mainLoop;
      }
    }
  }

  return ret;
}
