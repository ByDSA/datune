import type { Interval } from "intervals/alt";
import { KeyMappedFlyweightCache } from "datils/patterns/caching";
import { idGeneratorUint8Array } from "_utils";
import { IntervalSet } from "../IntervalSet";

export type Key = Set<Interval>;

export const getKey = (intervalSet: IntervalSet) => (intervalSet as any).set;

const MAX_INTERVAL_MAGNITUDE = 11 * 7; // 7 diatonic intervals/octave * 11 octaves
const STATES_PER_INTERVAL = 12; // 6 sharps + 5 flats + 1 natural
const UINT8_ARRAY_SIZE = Math.ceil((MAX_INTERVAL_MAGNITUDE + 1) * STATES_PER_INTERVAL / 8);

export const getId = (key: Key): string => idGeneratorUint8Array(
  key,
  UINT8_ARRAY_SIZE,
  // Se usa +1 para dejar "0" a empty
  (interval)=>((interval.diatonicInterval.magnitude + 1) * STATES_PER_INTERVAL)
    + (interval.alts + 5),
);

export function getObjId(intervalSet: IntervalSet): string {
  return getId(getKey(intervalSet));
}

export const cache = new KeyMappedFlyweightCache( {
  getId,
  getKey,
  create: key=>new (IntervalSet as any)(key),
} );
