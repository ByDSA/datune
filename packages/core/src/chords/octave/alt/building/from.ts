import { cache, type Key } from "../caching/cache";
import { Chord } from "../Chord";

export function from(key: Key): Chord {
  let { pitchSet } = key;

  if (key.bass === key.root)
    pitchSet = pitchSet.withAdd(key.bass);

  return cache.getOrCreate( {
    ...key,
    pitchSet,
  } );
}

// eslint-disable-next-line no-underscore-dangle
(Chord as any)._from = from;
