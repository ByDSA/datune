import type { ConcertPitch } from "concert-pitches/chromatic";
import type { Temperament } from "temperaments/chromatic";
import { KeyMappedFlyweightCache } from "datils/patterns/caching";
import { getObjId as concertPitchesGetObjId } from "concert-pitches/chromatic/caching/cache";
import { getObjId as temperamentGetObjId } from "temperaments/chromatic/id";
import { Tuning } from "../Tuning";

export type Key = {
  concertPitch: ConcertPitch;
  temperament: Temperament;
};

export const cache = new KeyMappedFlyweightCache<Tuning, Key, string>( {
  getId(key: Key): string {
    const concertPitchId = concertPitchesGetObjId(key.concertPitch);
    const temperamentId = temperamentGetObjId(key.temperament);

    return concertPitchId + temperamentId;
  },
  getKey(tuning: Tuning): Key {
    return {
      concertPitch: tuning.concertPitch,
      temperament: tuning.temperament,
    };
  },
  create: key=>new (Tuning as any)(key),
} );
