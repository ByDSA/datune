import type { Pitch } from "pitches/chromatic";
import { KeyMappedFlyweightCache } from "datils/patterns/caching";
import { PitchSet } from "../PitchSet";

export type Key = Set<Pitch>;

export const getKey = (ps: PitchSet) => ps.set;

export const getId = (key: Key): string => {
  let id = 0;

  for (const pitch of key)
    // eslint-disable-next-line no-bitwise
    id |= 1 << (+pitch + 1); // Se usa +1 para dejar "0" a empty

  return id.toString();
};

export const cache = new KeyMappedFlyweightCache( {
  getId,
  getKey,
  create: key => new (PitchSet as any)(key),
} );
