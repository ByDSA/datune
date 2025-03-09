import type { Interval } from "intervals/alt";
import type { PitchArray, Pitch } from "pitches/alt";
import type { Chord } from "../Chord";
import { Arrays } from "@datune/utils";
import { Pitches as P } from "pitches/alt";
import { fromPitches } from "../building";

export function inv(chord: Chord, n: number = 1): Chord {
  const notes: PitchArray = [...chord.pitches];

  Arrays.rotateLeft(notes, n);

  return fromPitches(...notes);
}

export function shift(chord: Chord, interval: Interval): Chord {
  const notes: PitchArray = chord.pitches.map(
    (p) => P.add(p, interval),
  ) as PitchArray;

  return fromPitches(...notes);
}

export function shiftDown(chord: Chord, interval: Interval): Chord {
  const notes: PitchArray = chord.pitches.map(
    (p) => P.sub(p, interval),
  ) as PitchArray;

  return fromPitches(...notes);
}

export function bass(chord: Chord, pitchBass: Pitch): Chord {
  const oldIndexOfNewBass = chord.pitches.indexOf(pitchBass);

  if (oldIndexOfNewBass < 0)
    return fromPitches(pitchBass, ...chord.pitches);

  return inv(chord, oldIndexOfNewBass);
}
