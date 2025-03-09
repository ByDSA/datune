import type { PitchArray, Pitch } from "pitches/chromatic";
import { Arrays } from "@datune/utils";
import { Pitches as P } from "pitches/chromatic";
import { fromPitches } from "../building/pitches";
import { Chord } from "../Chord";

export function inv(chord: Chord, n: number = 1): Chord {
  const notes: PitchArray = [...chord.pitches] as PitchArray;

  Arrays.rotateLeft(notes, n);

  return fromPitches(...notes);
}

export function shift(chord: Chord, interval: number): Chord {
  const notes: PitchArray = <PitchArray> chord.pitches.map(
    (chromatic: Pitch) => P.add(chromatic, interval),
  );

  return fromPitches(...notes);
}

export function shiftDown(chord: Chord, interval: number): Chord {
  const notes: PitchArray = <PitchArray> chord.pitches.map(
    (chromatic: Pitch) => P.sub(chromatic, interval),
  );

  return fromPitches(...notes);
}

export function bass(obj: Chord, bassNote: Pitch): Chord {
  const oldIndexOfNewBass = obj.pitches.indexOf(bassNote);

  if (oldIndexOfNewBass < 0)
    return fromPitches(bassNote, ...obj.pitches);

  return inv(obj, oldIndexOfNewBass);
}
