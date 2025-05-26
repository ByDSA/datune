import { SymbolicChord } from "../../SymbolicChord";
import { ChordPitch } from "../types";

export function root<C extends SymbolicChord<any, any>>(
  obj: C,
  pitchRoot: ChordPitch<C>,
): C {
  const { _from: from } = (obj.constructor as any);

  return from( {
    pitchSet: obj.pitchSet,
    root: pitchRoot,
    bass: obj.bass,
  } );
}
