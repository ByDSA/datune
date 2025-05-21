import type { Pitch } from "pitches/chromatic";
import { KeyMappedFlyweightCache } from "datils/patterns/caching";
import { PitchSet } from "../PitchSet";

export type Key = Set<Pitch>;

export const getKey = (ps: PitchSet) => ps.pitches;

export const getId = (key: Key): string => {
  let id = 0;

  for (const pitch of key)
    // eslint-disable-next-line no-bitwise
    id |= 1 << +pitch;

  return id.toString();
};

export const cache = new KeyMappedFlyweightCache( {
  getId,
  getKey,
  create: key => new (PitchSet as any)(key),
} );
