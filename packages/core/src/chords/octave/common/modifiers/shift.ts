import { SymbolicChord } from "chords/octave/SymbolicChord";
import { ChordInterval } from "../types";

export function shift<C extends SymbolicChord<any, any>>(
  obj: C,
  interval: ChordInterval<C>,
): C {
  const { _from: from } = (obj.constructor as any);

  return from( {
    pitchSet: obj.pitchSet.withShifted(interval),
    root: obj.root.withShifted(interval),
    bass: obj.bass.withShifted(interval),
  } );
}

export function shiftDown<C extends SymbolicChord<any, any>>(
  obj: C,
  interval: ChordInterval<C>,
): C {
  const { _from: from } = (obj.constructor as any);

  return from( {
    pitchSet: obj.pitchSet.withShiftedDown(interval),
    root: obj.root.withShiftedDown(interval),
    bass: obj.bass.withShiftedDown(interval),
  } );
}
