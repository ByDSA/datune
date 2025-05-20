import type { PitchArray, Pitch } from "pitches/chromatic";
import { Arrays } from "datils/datatypes/arrays";
import { Pitches as P } from "pitches/chromatic";
import { from, fromPitches } from "../building/pitches";
import { Chord } from "../Chord";

export function inv(chord: Chord, n: number = 1): Chord {
  const pitches: PitchArray = [...chord.pitches] as PitchArray;

  Arrays.rotateLeft(pitches, n);

  const rIndex = (chord.rootIndex - (n % chord.length) + chord.length) % chord.length;

  return from( {
    pitches,
    rootIndex: rIndex,
  } );
}

export function shift(chord: Chord, interval: number): Chord {
  const notes: PitchArray = <PitchArray> chord.pitches.map(
    (chromatic: Pitch) => P.add(chromatic, interval),
  );

  return from( {
    pitches: notes,
    rootIndex: chord.rootIndex,
  } );
}

export function shiftDown(chord: Chord, interval: number): Chord {
  const notes: PitchArray = <PitchArray> chord.pitches.map(
    (chromatic: Pitch) => P.sub(chromatic, interval),
  );

  return from( {
    pitches: notes,
    rootIndex: chord.rootIndex,
  } );
}

export function bass(obj: Chord, bassNote: Pitch): Chord {
  const oldIndexOfNewBass = obj.pitches.indexOf(bassNote);

  if (oldIndexOfNewBass < 0)
    return fromPitches(bassNote, ...obj.pitches);

  return inv(obj, oldIndexOfNewBass);
}

export function rootIndex(obj: Chord, index: number): Chord {
  return from( {
    pitches: obj.pitches,
    rootIndex: index,
  } );
}
