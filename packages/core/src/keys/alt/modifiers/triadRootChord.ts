import type { Chord } from "chords/alt";
import type { Interval } from "intervals/alt";
import type { IntervalSet } from "sets/interval-sets/alt";
import { IntervalSets as IS } from "sets/interval-sets/alt";
import { Pitches as P } from "pitches/alt";
import { Chords as C } from "chords/alt";
import { Intervals as I } from "intervals/alt";
import { Key } from "../Key";

type Choices = {
  interval: Interval;
  intervalSet: IntervalSet;
}[];
export function triadRootChord(obj: Key): Chord | null {
  const { M6, M3, m6, m3, P1 } = I;
  const { TRIAD_AUGMENTED, TRIAD_DIMINISHED, TRIAD_MAJOR, TRIAD_MINOR } = IS;
  const chordRootIntervalSetPriority: Choices = [
    {
      interval: P1,
      intervalSet: TRIAD_MAJOR,
    },
    {
      interval: P1,
      intervalSet: TRIAD_MINOR,
    },
    {
      interval: M3,
      intervalSet: TRIAD_MINOR,
    },
    {
      interval: M3,
      intervalSet: TRIAD_MAJOR,
    },
    {
      interval: m3,
      intervalSet: TRIAD_MINOR,
    },
    {
      interval: m3,
      intervalSet: TRIAD_MAJOR,
    },
    {
      interval: M6,
      intervalSet: TRIAD_MINOR,
    },
    {
      interval: M6,
      intervalSet: TRIAD_MAJOR,
    },
    {
      interval: m6,
      intervalSet: TRIAD_MINOR,
    },
    {
      interval: m6,
      intervalSet: TRIAD_MAJOR,
    },
    {
      interval: P1,
      intervalSet: TRIAD_DIMINISHED,
    },
    {
      interval: P1,
      intervalSet: TRIAD_AUGMENTED,
    },
    {
      interval: M3,
      intervalSet: TRIAD_DIMINISHED,
    },
    {
      interval: M3,
      intervalSet: TRIAD_AUGMENTED,
    },
    {
      interval: m3,
      intervalSet: TRIAD_DIMINISHED,
    },
    {
      interval: m3,
      intervalSet: TRIAD_AUGMENTED,
    },
    {
      interval: M6,
      intervalSet: TRIAD_DIMINISHED,
    },
    {
      interval: M6,
      intervalSet: TRIAD_AUGMENTED,
    },
    {
      interval: m6,
      intervalSet: TRIAD_DIMINISHED,
    },
    {
      interval: m6,
      intervalSet: TRIAD_AUGMENTED,
    },
  ];
  let ret = null;

  for (const o of chordRootIntervalSetPriority) {
    const pitch = P.shift(obj.root, o.interval);
    const chord = C.fromRootIntervalSet(pitch, o.intervalSet);

    if (obj.hasChord(chord)) {
      ret = chord;
      break;
    }
  }

  return ret;
}
