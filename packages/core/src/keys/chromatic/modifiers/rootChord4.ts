/* eslint-disable no-restricted-syntax */
import { Chord, fromRootVoicing } from "chords/chromatic";
import { fromRootIntervals } from "voicings/chromatic";
import Key from "../Key";

export default function rootChord4(obj: Key): Chord | null {
  const chordRootVoicingPriority = [
    fromRootIntervals(0, 4, 7, 11),
    fromRootIntervals(0, 3, 7, 11),
    fromRootIntervals(0, 4, 7, 10),
    fromRootIntervals(0, 3, 7, 10),
    fromRootIntervals(0, 3, 6, 10),
    fromRootIntervals(0, 3, 6, 11),
    fromRootIntervals(0, 4, 8, 10),
    fromRootIntervals(0, 4, 8, 11),
  ];
  let ret = null;

  for (const voicing of chordRootVoicingPriority) {
    if (!voicing)
      // eslint-disable-next-line no-continue
      continue;

    const chord = fromRootVoicing(obj.root, voicing);

    if (obj.hasChord(chord)) {
      ret = chord;
      break;
    }
  }

  return ret;
}
