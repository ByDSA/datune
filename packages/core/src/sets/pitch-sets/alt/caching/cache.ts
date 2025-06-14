import type { Pitch } from "pitches/alt";
import { KeyMappedFlyweightCache } from "datils/patterns/caching";
import { getId as getPitchId } from "pitches/alt/caching/cache";
import { PitchSet } from "../PitchSet";

export type Key = Set<Pitch>;

export const getKey = (ps: PitchSet) => ps.set;

export const getId = (key: Key): string => {
  let id = [...key]
    .sort((a, b)=>+a - +b)
    .map(getPitchId)
    .join("-");

  return id;
};

export const cache = new KeyMappedFlyweightCache( {
  getId,
  getKey,
  create: key => new (PitchSet as any)(key),
} );
