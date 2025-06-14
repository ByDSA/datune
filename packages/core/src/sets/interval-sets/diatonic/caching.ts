import { KeyMappedFlyweightCache } from "datils/patterns/caching";
import { idGeneratorUint8Array } from "_utils";
import { IntervalSet } from "./IntervalSet";

export type Key = Set<number>;

export const getKey = (intervalSet: IntervalSet) => (intervalSet as any).set;

const MAX_INTERVAL_MAGNITUDE = 11 * 7; // 7 diatonic intervals/octave * 11 octaves
const STATES_PER_INTERVAL = 1;
const UINT8_ARRAY_SIZE = Math.ceil((MAX_INTERVAL_MAGNITUDE + 1) * STATES_PER_INTERVAL / 8);

export const getId = (key: Key): string => idGeneratorUint8Array(
  key,
  UINT8_ARRAY_SIZE,
  (interval)=>interval + 1, // Se usa +1 para dejar "0" a empty
);

export const cache = new KeyMappedFlyweightCache( {
  getId,
  getKey,
  create: key => new (IntervalSet as any)(key),
} );
