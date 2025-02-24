import { Arrays } from "@datune/utils";
import { add as pitchAdd, Array as PitchArray, Pitch, sub as pitchSub } from "pitches/chromatic";
import { fromPitches } from "../building";
import Chord from "../Chord";

export function inv(obj: Chord, n: number = 1): Chord {
  const notes: PitchArray = [...obj.pitches] as PitchArray;

  Arrays.rotateLeft(notes, n);

  return fromPitches(...notes);
}

export function add(obj: Chord, interval: number): Chord {
  const notes: PitchArray = <PitchArray> obj.pitches.map(
    (chromatic: Pitch) => pitchAdd(chromatic, interval),
  );

  return fromPitches(...notes);
}

export function sub(obj: Chord, interval: number): Chord {
  const notes: PitchArray = <PitchArray> obj.pitches.map(
    (chromatic: Pitch) => pitchSub(chromatic, interval),
  );

  return fromPitches(...notes);
}

export function bass(obj: Chord, bassNote: Pitch): Chord {
  const oldIndexOfNewBass = obj.pitches.indexOf(bassNote);

  if (oldIndexOfNewBass < 0)
    return fromPitches(bassNote, ...obj.pitches);

  return inv(obj, oldIndexOfNewBass);
}
