import type { Degree as DDegree } from "degrees/diatonic";
import { KeyMappedFlyweightCache } from "datils/caching";
import { Degree } from "../Degree";

export type Key = {
  diatonicDegree: DDegree;
  alts: number;
 };

export function getId(key: Key): string {
  return `${+key.diatonicDegree}:${key.alts}`;
}

export function getKey(degree: Degree): Key {
  return {
    diatonicDegree: degree.diatonicDegree,
    alts: degree.alts,
  };
}

export function getObjId(degree: Degree): string {
  return getId(getKey(degree));
}

export const cache = new KeyMappedFlyweightCache<Degree, Key, string>( {
  getId,
  getKey,
  create: key=> new (Degree as any)(key),
} );
