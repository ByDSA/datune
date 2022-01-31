import { Chord, fromRootVoicing as chordFromRootVoicing } from "chords/alt";
import { Interval, MAJOR_SIXTH, MAJOR_THIRD, MINOR_SIXTH, MINOR_THIRD, PERFECT_UNISON } from "intervals/alt";
import { add as pitchAdd } from "pitches/alt";
import { fromVoicings, TRIAD_AUGMENTED, TRIAD_DIMINISHED, TRIAD_MAJOR, TRIAD_MINOR, Voicing } from "voicings/alt";
import { fromRootIntervals as CVFromRootIntervals } from "voicings/chromatic";
import { SEVENTH as DV_SEVENTH } from "voicings/diatonic";
import Key from "../Key";

type Choices = {
  interval: Interval;
  voicing: Voicing;
}[];
export function rootChord3(obj: Key): Chord | null {
  const chordRootVoicingPriority: Choices = [
    {
      interval: PERFECT_UNISON,
      voicing: TRIAD_MAJOR,
    },
    {
      interval: PERFECT_UNISON,
      voicing: TRIAD_MINOR,
    },
    {
      interval: MAJOR_THIRD,
      voicing: TRIAD_MINOR,
    },
    {
      interval: MAJOR_THIRD,
      voicing: TRIAD_MAJOR,
    },
    {
      interval: MINOR_THIRD,
      voicing: TRIAD_MINOR,
    },
    {
      interval: MINOR_THIRD,
      voicing: TRIAD_MAJOR,
    },
    {
      interval: MAJOR_SIXTH,
      voicing: TRIAD_MINOR,
    },
    {
      interval: MAJOR_SIXTH,
      voicing: TRIAD_MAJOR,
    },
    {
      interval: MINOR_SIXTH,
      voicing: TRIAD_MINOR,
    },
    {
      interval: MINOR_SIXTH,
      voicing: TRIAD_MAJOR,
    },
    {
      interval: PERFECT_UNISON,
      voicing: TRIAD_DIMINISHED,
    },
    {
      interval: PERFECT_UNISON,
      voicing: TRIAD_AUGMENTED,
    },
    {
      interval: MAJOR_THIRD,
      voicing: TRIAD_DIMINISHED,
    },
    {
      interval: MAJOR_THIRD,
      voicing: TRIAD_AUGMENTED,
    },
    {
      interval: MINOR_THIRD,
      voicing: TRIAD_DIMINISHED,
    },
    {
      interval: MINOR_THIRD,
      voicing: TRIAD_AUGMENTED,
    },
    {
      interval: MAJOR_SIXTH,
      voicing: TRIAD_DIMINISHED,
    },
    {
      interval: MAJOR_SIXTH,
      voicing: TRIAD_AUGMENTED,
    },
    {
      interval: MINOR_SIXTH,
      voicing: TRIAD_DIMINISHED,
    },
    {
      interval: MINOR_SIXTH,
      voicing: TRIAD_AUGMENTED,
    },
  ];
  let ret = null;

  for (const o of chordRootVoicingPriority) {
    const pitch = pitchAdd(obj.root, o.interval);
    const chord = chordFromRootVoicing(pitch, o.voicing);

    if (obj.hasChord(chord)) {
      ret = chord;
      break;
    }
  }

  return ret;
}

export function rootChord4(obj: Key): Chord | null {
  const chordRootVoicingPriority: Voicing[] = [
    fromVoicings(CVFromRootIntervals(0, 4, 7, 11), DV_SEVENTH) as Voicing,
    fromVoicings(CVFromRootIntervals(0, 3, 7, 11), DV_SEVENTH) as Voicing,
    fromVoicings(CVFromRootIntervals(0, 4, 7, 10), DV_SEVENTH) as Voicing,
    fromVoicings(CVFromRootIntervals(0, 3, 7, 10), DV_SEVENTH) as Voicing,
    fromVoicings(CVFromRootIntervals(0, 3, 6, 10), DV_SEVENTH) as Voicing,
    fromVoicings(CVFromRootIntervals(0, 3, 6, 11), DV_SEVENTH) as Voicing,
    fromVoicings(CVFromRootIntervals(0, 4, 8, 10), DV_SEVENTH) as Voicing,
    fromVoicings(CVFromRootIntervals(0, 4, 8, 11), DV_SEVENTH) as Voicing,
  ];
  let ret = null;

  for (const voicing of chordRootVoicingPriority) {
    const chord = chordFromRootVoicing(obj.root, voicing);

    if (obj.hasChord(chord)) {
      ret = chord;
      break;
    }
  }

  return ret;
}
