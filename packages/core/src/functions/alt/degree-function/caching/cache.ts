import type { Degree } from "degrees/alt";
import type { Voicing } from "voicings/alt";
import { KeyMappedFlyweightCache } from "datils/patterns/caching";
import { getObjId as degreeGetObjId } from "degrees/alt/caching/cache";
import { getObjId as voicingGetObjId } from "voicings/relative/alt/caching/cache";
import { DegreeFunc } from "../DegreeFunc";

export type Key = {
  degree: Degree;
  voicing: Voicing;
};

export function getId(key: Key): string {
  const voicingId = voicingGetObjId(key.voicing);
  const degreeId = degreeGetObjId(key.degree);

  return `(${degreeId})|(${voicingId})`;
}

export function getKey(func: DegreeFunc): Key {
  return {
    degree: func.degree,
    voicing: func.voicing,
  };
}

export function getObjId(func: DegreeFunc): string {
  return getId(getKey(func));
}

export const cache = new KeyMappedFlyweightCache<DegreeFunc, Key, string>( {
  getId: getId,
  getKey,
  create: key=>new (DegreeFunc as any)(key),
} );
