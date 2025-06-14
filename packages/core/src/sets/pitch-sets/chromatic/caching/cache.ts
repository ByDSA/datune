import type { Pitch } from "pitches/chromatic";
import { KeyMappedFlyweightCache } from "datils/patterns/caching";
import { idGeneratorNumber } from "_utils";
import { PitchSet } from "../PitchSet";

export type Key = Set<Pitch>;

export const getKey = (ps: PitchSet) => (ps as any).set;

export const getId = (key: Key): number => idGeneratorNumber(
  key,
  (p)=>+p + 1, // Se usa +1 para dejar "0" a empty
);

export const cache = new KeyMappedFlyweightCache( {
  getId,
  getKey,
  create: key => new (PitchSet as any)(key),
} );
