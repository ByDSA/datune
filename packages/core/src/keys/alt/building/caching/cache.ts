import type { Pitch } from "pitches/alt";
import type { Scale } from "scales/alt";
import { KeyMappedFlyweightCache } from "datils/patterns/caching";
import { getObjId as pitchGetObjId } from "pitches/alt/id";
import { getObjId as scaleGetObjId } from "scales/symbolic/alt/caching/cache";
import { Key } from "../../Key";

export type K = {
  root: Pitch;
  scale: Scale;
};

export function getKey(key: Key): K {
  return {
    root: key.root,
    scale: key.scale,
  };
}

export function getId(obj: K): string {
  const rootId = pitchGetObjId(obj.root);
  const scaleId = scaleGetObjId(obj.scale);

  return `${rootId}|(${scaleId})`;
}

export function getObjId(key: Key): string {
  return getId(getKey(key));
}

export const cache = new KeyMappedFlyweightCache<Key, K, string>( {
  getId,
  getKey,
  create: key=>new (Key as any)(key),
} );
