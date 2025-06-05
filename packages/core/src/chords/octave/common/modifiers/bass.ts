import { SymbolicChord } from "../../SymbolicChord";
import { ChordPitch } from "../types";

export function bass<C extends SymbolicChord<any, any>>(obj: C, pitchBass: ChordPitch<C>): C {
  const { _from: from } = (obj.constructor as any);

  return from( {
    pitchSet: obj.pitchSet.withAdded(pitchBass),
    root: obj.root,
    bass: pitchBass,
  } );
}
