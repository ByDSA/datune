import { Chord, Chords } from "chords/chromatic";
import { Voicings } from "voicings/chromatic";
import { Key } from "../Key";

export function rootChord3(obj: Key): Chord | null {
  const { inv, TRIAD_AUGMENTED, TRIAD_DIMINISHED, TRIAD_MAJOR, TRIAD_MINOR } = Voicings;
  const voicingPriority = [
    TRIAD_MAJOR,
    TRIAD_MINOR,
    TRIAD_DIMINISHED,
    TRIAD_AUGMENTED,
  ];

  for (let i = 0; i < 3; i++) {
    for (const voicing of voicingPriority) {
      let voicingInv = voicing;

      if (i > 0)
        voicingInv = inv(voicingInv, i);

      const chord = Chords.fromRootVoicing(obj.root, voicingInv);

      if (obj.hasChord(chord))
        return chord;
    }
  }

  return null;
}
