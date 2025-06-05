import { NonEmptyArray } from "datils";
import { SymbolicChord } from "../../SymbolicChord";
import { ChordPitch } from "../types";
import { ERROR_REMOVING_BASS } from "../errors";

export function add<C extends SymbolicChord<any, any>>(
  obj: C,
  ...pitches: NonEmptyArray<ChordPitch<C>>
): C {
  const { _from: from } = (obj.constructor as any);

  return from( {
    pitchSet: obj.pitchSet.withAdded(...pitches),
    root: obj.root,
    bass: obj.bass,
  } );
}

export function remove<C extends SymbolicChord<any, any>>(
  obj: C,
  ...pitches: NonEmptyArray<ChordPitch<C>>
): C {
  if (pitches.includes(obj.bass))
    throw ERROR_REMOVING_BASS;

  const { _from: from } = (obj.constructor as any);

  return from( {
    pitchSet: obj.pitchSet.withRemoved(...pitches),
    root: obj.root,
    bass: obj.bass,
  } );
}
