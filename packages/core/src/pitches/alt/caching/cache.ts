import type { Pitch as DPitch } from "pitches/diatonic";
import { KeyMappedFlyweightCache } from "datils/caching";
import { Pitch } from "../Pitch";

export type Key = {
  diatonic: DPitch;
  alts: number;
};

export const getKey = (pitch: Pitch): Key => ( {
  diatonic: pitch.diatonic,
  alts: pitch.alts,
} );

export const getId = (key: Key): string => `${+key.diatonic}:${key.alts}`;

export const cache = new KeyMappedFlyweightCache<Pitch, Key, string>( {
  getId,
  getKey,
  create: key => new (Pitch as any)(key),
} );
