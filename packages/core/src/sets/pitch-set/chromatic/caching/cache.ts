import type { Pitch } from "pitches/chromatic";
import { KeyMappedFlyweightCache } from "datils/patterns/caching";
import { Pitches } from "pitches/chromatic";
import { PitchSet } from "../PitchSet";

/* eslint-disable @typescript-eslint/naming-convention */
export type Key = Set<Pitch>;

export const getKey = (ps: PitchSet) => ps.pitches;

export const getId = (key: Key): string => {
  const { A, AA, B, C, CC, D, DD, E, F, FF, G, GG } = Pitches;
  const hasC = key.has(C) ? 1 : 0;
  const hasCC = key.has(CC) ? 1 : 0;
  const hasD = key.has(D) ? 1 : 0;
  const hasDD = key.has(DD) ? 1 : 0;
  const hasE = key.has(E) ? 1 : 0;
  const hasF = key.has(F) ? 1 : 0;
  const hasFF = key.has(FF) ? 1 : 0;
  const hasG = key.has(G) ? 1 : 0;
  const hasGG = key.has(GG) ? 1 : 0;
  const hasA = key.has(A) ? 1 : 0;
  const hasAA = key.has(AA) ? 1 : 0;
  const hasB = key.has(B) ? 1 : 0;
  const id = (hasC * 2)
        + (hasCC * 3)
        + (hasD * 5)
        + (hasDD * 7)
        + (hasE * 11)
        + (hasF * 13)
        + (hasFF * 17)
        + (hasG * 19)
        + (hasGG * 23)
        + (hasA * 29)
        + (hasAA * 31)
        + (hasB * 37);

  return id.toString();
};

export const cache = new KeyMappedFlyweightCache( {
  getId,
  getKey,
  create: key => new (PitchSet as any)(key),
} );
