import { Key } from "../Key";
import type { Chord } from "chords/alt";
import { Chords } from "chords/alt";
import { Voicings, Voicing } from "voicings/alt";
import { Voicings as CVoicings } from "voicings/chromatic";
import { Voicings as DV } from "voicings/diatonic";

export function rootChord4(obj: Key): Chord | null {
  const { fromVoicings } = Voicings;
  const chordRootVoicingPriority: Voicing[] = [
    fromVoicings(CVoicings.fromRootIntervals(0, 4, 7, 11), DV.SEVENTH) as Voicing,
    fromVoicings(CVoicings.fromRootIntervals(0, 3, 7, 11), DV.SEVENTH) as Voicing,
    fromVoicings(CVoicings.fromRootIntervals(0, 4, 7, 10), DV.SEVENTH) as Voicing,
    fromVoicings(CVoicings.fromRootIntervals(0, 3, 7, 10), DV.SEVENTH) as Voicing,
    fromVoicings(CVoicings.fromRootIntervals(0, 3, 6, 10), DV.SEVENTH) as Voicing,
    fromVoicings(CVoicings.fromRootIntervals(0, 3, 6, 11), DV.SEVENTH) as Voicing,
    fromVoicings(CVoicings.fromRootIntervals(0, 4, 8, 10), DV.SEVENTH) as Voicing,
    fromVoicings(CVoicings.fromRootIntervals(0, 4, 8, 11), DV.SEVENTH) as Voicing,
  ];
  let ret = null;

  for (const voicing of chordRootVoicingPriority) {
    const chord = Chords.fromRootVoicing(obj.root, voicing);

    if (obj.hasChord(chord)) {
      ret = chord;
      break;
    }
  }

  return ret;
}
