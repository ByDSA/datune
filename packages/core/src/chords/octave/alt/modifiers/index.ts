import type { Interval } from "intervals/alt";
import type { PitchArray, Pitch } from "pitches/alt";
import type { Chord } from "../Chord";
import { Arrays } from "datils/datatypes/arrays";
import { Pitches as P } from "pitches/alt";
import { fromPitches } from "../building";
import { from } from "../building/pitches";

export function inv(chord: Chord, n: number = 1): Chord {
  const notes: PitchArray = [...chord.pitches];

  Arrays.rotateLeft(notes, n);

  const rIndex = (chord.rootIndex - (n % chord.length) + chord.length) % chord.length;

  return from( {
    pitches: notes,
    rootIndex: rIndex,
  } );
}

export function shift(chord: Chord, interval: Interval): Chord {
  const notes: PitchArray = chord.pitches.map(
    (p) => P.add(p, interval),
  ) as PitchArray;

  return from( {
    pitches: notes,
    rootIndex: chord.rootIndex,
  } );
}

export function shiftDown(chord: Chord, interval: Interval): Chord {
  const notes: PitchArray = chord.pitches.map(
    (p) => P.sub(p, interval),
  ) as PitchArray;

  return from( {
    pitches: notes,
    rootIndex: chord.rootIndex,
  } );
}

export function bass(chord: Chord, pitchBass: Pitch): Chord {
  const oldIndexOfNewBass = chord.pitches.indexOf(pitchBass);

  if (oldIndexOfNewBass < 0)
    return fromPitches(pitchBass, ...chord.pitches);

  return inv(chord, oldIndexOfNewBass);
}

export function rootIndex(obj: Chord, index: number): Chord {
  return from( {
    pitches: obj.pitches,
    rootIndex: index,
  } );
}
