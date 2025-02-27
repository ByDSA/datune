import { Pitches } from "pitches/alt";
import { Chord, Chords } from "chords/alt";
import { Interval, Intervals } from "intervals/alt";
import { Voicings, Voicing } from "voicings/alt";
import { Key } from "../Key";

type Choices = {
  interval: Interval;
  voicing: Voicing;
}[];
export function rootChord3(obj: Key): Chord | null {
  const { MAJOR_SIXTH, MAJOR_THIRD, MINOR_SIXTH, MINOR_THIRD, PERFECT_UNISON } = Intervals;
  const { TRIAD_AUGMENTED, TRIAD_DIMINISHED, TRIAD_MAJOR, TRIAD_MINOR } = Voicings;
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
    const pitch = Pitches.add(obj.root, o.interval);
    const chord = Chords.fromRootVoicing(pitch, o.voicing);

    if (obj.hasChord(chord)) {
      ret = chord;
      break;
    }
  }

  return ret;
}
