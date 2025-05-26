import { NonEmptyArray } from "datils";
import { SymbolicChord } from "../../SymbolicChord";
import { ChordPitch } from "../types";

export function add<C extends SymbolicChord<any, any>>(
  obj: C,
  ...pitches: NonEmptyArray<ChordPitch<C>>
): C {
  const { _from: from } = (obj.constructor as any);

  return from( {
    pitchSet: obj.pitchSet.withAdd(...pitches),
    root: obj.root,
    bass: obj.bass,
  } );
}

export function remove<C extends SymbolicChord<any, any>>(
  obj: C,
  ...pitches: NonEmptyArray<ChordPitch<C>>
): C {
  const { _from: from } = (obj.constructor as any);

  return from( {
    pitchSet: obj.pitchSet.withRemove(...pitches),
    root: obj.root,
    bass: obj.bass,
  } );
}
