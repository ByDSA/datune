import { Arrays } from "@datune/utils";
import { fromPitches } from "../building/pitches";
import { Chord } from "../Chord";
import { Pitches, PitchArray, Pitch } from "pitches/chromatic";

export function inv(obj: Chord, n: number = 1): Chord {
  const notes: PitchArray = [...obj.pitches] as PitchArray;

  Arrays.rotateLeft(notes, n);

  return fromPitches(...notes);
}

export function add(obj: Chord, interval: number): Chord {
  const notes: PitchArray = <PitchArray> obj.pitches.map(
    (chromatic: Pitch) => Pitches.add(chromatic, interval),
  );

  return fromPitches(...notes);
}

export function sub(obj: Chord, interval: number): Chord {
  const notes: PitchArray = <PitchArray> obj.pitches.map(
    (chromatic: Pitch) => Pitches.sub(chromatic, interval),
  );

  return fromPitches(...notes);
}

export function bass(obj: Chord, bassNote: Pitch): Chord {
  const oldIndexOfNewBass = obj.pitches.indexOf(bassNote);

  if (oldIndexOfNewBass < 0)
    return fromPitches(bassNote, ...obj.pitches);

  return inv(obj, oldIndexOfNewBass);
}
