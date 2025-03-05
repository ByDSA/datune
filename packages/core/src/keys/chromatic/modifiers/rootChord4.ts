import { Chord, Chords } from "chords/chromatic";
import { Voicings } from "voicings/chromatic";
import { Key } from "../Key";

export function rootChord4(obj: Key): Chord | null {
  const chordRootVoicingPriority = [
    Voicings.fromRootIntervals(0, 4, 7, 11), // Maj7
    Voicings.fromRootIntervals(0, 3, 7, 11), // mMaj7
    Voicings.fromRootIntervals(0, 4, 7, 10), // 7
    Voicings.fromRootIntervals(0, 3, 7, 10), // m7
    Voicings.fromRootIntervals(0, 3, 6, 10), // m7b5
    Voicings.fromRootIntervals(0, 3, 6, 11),
    Voicings.fromRootIntervals(0, 4, 8, 10),
    Voicings.fromRootIntervals(0, 4, 8, 11),
  ];
  let ret = null;

  for (const voicing of chordRootVoicingPriority) {
    if (!voicing)
      // eslint-disable-next-line no-continue
      continue;

    const chord = Chords.fromRootVoicing(obj.root, voicing);

    if (obj.hasChord(chord)) {
      ret = chord;
      break;
    }
  }

  return ret;
}
