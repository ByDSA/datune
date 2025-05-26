import { SymbolicChord } from "chords/octave/SymbolicChord";
import { ChordInterval } from "../types";

export function shift<C extends SymbolicChord<any, any>>(
  obj: C,
  interval: ChordInterval<C>,
): C {
  const { _from: from } = (obj.constructor as any);

  return from( {
    pitchSet: obj.pitchSet.withShift(interval),
    root: obj.root.withAdd(interval),
    bass: obj.bass.withAdd(interval),
  } );
}

export function shiftDown<C extends SymbolicChord<any, any>>(
  obj: C,
  interval: ChordInterval<C>,
): C {
  const { _from: from } = (obj.constructor as any);

  return from( {
    pitchSet: obj.pitchSet.withShiftDown(interval),
    root: obj.root.withSub(interval),
    bass: obj.bass.withSub(interval),
  } );
}
