import type { Spn } from "chromatic";
import { KeyMappedFlyweightCache } from "datils/patterns/caching";
import { getId as spnGetId } from "spns/symbolic/chromatic/building/caching/key";
import { ConcertPitch } from "../ConcertPitch";

export type Key = {
  frequency: number;
  spn: Spn;
};

export function getKey(concertPitch: ConcertPitch): Key {
  return {
    frequency: concertPitch.frequency,
    spn: concertPitch.spn,
  };
}

export function getId( { spn, frequency }: Key): string {
  const absPitchId = spnGetId(spn);

  return `${absPitchId}:${frequency}`;
}

export function getObjId(concertPitch: ConcertPitch): string {
  return getId(getKey(concertPitch));
}

export const cache = new KeyMappedFlyweightCache<ConcertPitch, Key, string>( {
  getId,
  getKey,
  create: (key: Key) => new (ConcertPitch as any)(key),
} );
