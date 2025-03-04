import type { Chord } from "chords/alt";
import { Pitches } from "pitches/alt";
import { Chords } from "chords/alt";
import { Interval, Intervals } from "intervals/alt";
import { Voicings, Voicing } from "voicings/alt";
import { Key } from "../Key";

type Choices = {
  interval: Interval;
  voicing: Voicing;
}[];
export function rootChord3(obj: Key): Chord | null {
  const { M6, M3, m6, m3, P1 } = Intervals;
  const { TRIAD_AUGMENTED, TRIAD_DIMINISHED, TRIAD_MAJOR, TRIAD_MINOR } = Voicings;
  const chordRootVoicingPriority: Choices = [
    {
      interval: P1,
      voicing: TRIAD_MAJOR,
    },
    {
      interval: P1,
      voicing: TRIAD_MINOR,
    },
    {
      interval: M3,
      voicing: TRIAD_MINOR,
    },
    {
      interval: M3,
      voicing: TRIAD_MAJOR,
    },
    {
      interval: m3,
      voicing: TRIAD_MINOR,
    },
    {
      interval: m3,
      voicing: TRIAD_MAJOR,
    },
    {
      interval: M6,
      voicing: TRIAD_MINOR,
    },
    {
      interval: M6,
      voicing: TRIAD_MAJOR,
    },
    {
      interval: m6,
      voicing: TRIAD_MINOR,
    },
    {
      interval: m6,
      voicing: TRIAD_MAJOR,
    },
    {
      interval: P1,
      voicing: TRIAD_DIMINISHED,
    },
    {
      interval: P1,
      voicing: TRIAD_AUGMENTED,
    },
    {
      interval: M3,
      voicing: TRIAD_DIMINISHED,
    },
    {
      interval: M3,
      voicing: TRIAD_AUGMENTED,
    },
    {
      interval: m3,
      voicing: TRIAD_DIMINISHED,
    },
    {
      interval: m3,
      voicing: TRIAD_AUGMENTED,
    },
    {
      interval: M6,
      voicing: TRIAD_DIMINISHED,
    },
    {
      interval: M6,
      voicing: TRIAD_AUGMENTED,
    },
    {
      interval: m6,
      voicing: TRIAD_DIMINISHED,
    },
    {
      interval: m6,
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
