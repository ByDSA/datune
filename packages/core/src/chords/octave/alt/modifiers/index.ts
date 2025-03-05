import type { Interval } from "intervals/alt";
import type { PitchArray, Pitch } from "pitches/alt";
import type { Chord } from "../Chord";
import { Arrays } from "@datune/utils";
import { Pitches as P } from "pitches/alt";
import { fromPitches } from "../building";

export function inv(obj: Chord, n: number = 1): Chord {
  const notes: PitchArray = [...obj.pitches];

  Arrays.rotateLeft(notes, n);

  return fromPitches(...notes);
}

export function add(obj: Chord, interval: Interval): Chord {
  const notes: PitchArray = obj.pitches.map(
    (p) => P.add(p, interval),
  ) as PitchArray;

  return fromPitches(...notes);
}

export function sub(obj: Chord, interval: Interval): Chord {
  const notes: PitchArray = obj.pitches.map(
    (p) => P.sub(p, interval),
  ) as PitchArray;

  return fromPitches(...notes);
}

export function bass(obj: Chord, pitchBass: Pitch): Chord {
  const oldIndexOfNewBass = obj.pitches.indexOf(pitchBass);

  if (oldIndexOfNewBass < 0)
    return fromPitches(pitchBass, ...obj.pitches);

  return inv(obj, oldIndexOfNewBass);
}
