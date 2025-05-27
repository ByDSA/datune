import { NonEmptyArray } from "datils";
import { SymbolicChord } from "../../SymbolicChord";
import { ChordInterval, ChordPitch } from "../types";
import { add, remove } from "./add-remove";

export function addRootIntervals<C extends SymbolicChord<any, any>>(
  obj: C,
  ...rootIntervals: NonEmptyArray<ChordInterval<C>>
): C {
  const pitches = rootIntervals.map(i=>obj.root.withAdd(i)) as NonEmptyArray<ChordPitch<C>>;

  return add(obj, ...pitches);
}

export function removeRootIntervals<C extends SymbolicChord<any, any>>(
  obj: C,
  ...rootIntervals: NonEmptyArray<ChordInterval<C>>
): C {
  const pitches = rootIntervals.map(i=>obj.root.withAdd(i)) as NonEmptyArray<ChordPitch<C>>;

  return remove(obj, ...pitches);
}
