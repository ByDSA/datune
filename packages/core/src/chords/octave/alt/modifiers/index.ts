import { Arrays } from "@datune/utils";
import { Interval } from "intervals/alt";
import { add as DAadd, Array as PitchArray, Pitch, sub as DAsub } from "pitches/alt";
import { fromPitches } from "../building";
import Chord from "../Chord";

export function inv(obj: Chord, n: number = 1): Chord {
  const notes: PitchArray = [...obj.pitches];

  Arrays.rotateLeft(notes, n);

  return fromPitches(...notes);
}

export function add(obj: Chord, interval: Interval): Chord {
  const notes: PitchArray = obj.pitches.map(
    (diatonicAlt) => DAadd(diatonicAlt, interval),
  ) as PitchArray;

  return fromPitches(...notes);
}

export function sub(obj: Chord, interval: Interval): Chord {
  const notes: PitchArray = obj.pitches.map(
    (diatonicAlt) => DAsub(diatonicAlt, interval),
  ) as PitchArray;

  return fromPitches(...notes);
}

export function bass(obj: Chord, pitchBass: Pitch): Chord {
  const oldIndexOfNewBass = obj.pitches.indexOf(pitchBass);

  if (oldIndexOfNewBass < 0)
    return fromPitches(pitchBass, ...obj.pitches);

  return inv(obj, oldIndexOfNewBass);
}
