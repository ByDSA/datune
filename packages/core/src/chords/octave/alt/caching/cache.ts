import { KeyMappedFlyweightCache } from "datils/patterns/caching";
import { type PitchArray } from "pitches/alt";
import { getObjId as pitchGetId } from "pitches/alt/id";
import { Chord } from "../Chord";

export type Key = PitchArray;

function getKey(chord: Chord): Key {
  return chord.pitches;
}

export function getId(key: Key): string {
  return key.map(pitchGetId).join("-");
}

export const cache = new KeyMappedFlyweightCache<Chord, Key, string>( {
  getId,
  getKey,
  create: (key: Key) => new (Chord as any)(key),
} );
