import type { Pitch } from "pitches/alt";
import { KeyMappedFlyweightCache } from "@datune/utils";
import { getObjId as pitchGetObjId } from "pitches/alt/id";
import { Spn } from "../../Spn";

export type Key = {
   pitch: Pitch;
  octave: number;
};

export function getId(key: Key): string {
  return `(${pitchGetObjId(key.pitch)})|${key.octave}`;
}

export function getKey(spn: Spn): Key {
  return {
    pitch: spn.pitch,
    octave: spn.octave,
  };
}

export const cache = new KeyMappedFlyweightCache<Spn, Key, string>( {
  getId,
  getKey,
  create: key=>new (Spn as any)(key),
} );
