import { KeyMappedFlyweightCache } from "datils/patterns/caching";
import { idGeneratorUint8Array } from "_utils";
import { IntervalSet } from "../IntervalSet";

export type Key = Set<number>;

const MAX_INTERVAL_MAGNITUDE = 127;
const STATES_PER_INTERVAL = 1;
const UINT8_ARRAY_SIZE = Math.ceil((MAX_INTERVAL_MAGNITUDE + 1) * STATES_PER_INTERVAL / 8);
const getId = (key: Key): string => idGeneratorUint8Array(
  key,
  UINT8_ARRAY_SIZE,
  (interval)=>interval + 1, // Se usa +1 para dejar "0" a empty
);
const getKey = (intervalSet: IntervalSet) => (intervalSet as any).set;

export function getObjId(intervalSet: IntervalSet): string {
  return getId(getKey(intervalSet));
}

export const cache = new KeyMappedFlyweightCache<IntervalSet, Key, string>( {
  getId,
  getKey,
  create: key=>new (IntervalSet as any)(key),
} );
