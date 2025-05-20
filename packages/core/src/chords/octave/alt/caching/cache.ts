import { KeyMappedFlyweightCache } from "datils/patterns/caching";
import { type PitchArray } from "pitches/alt";
import { getObjId as pitchGetId } from "pitches/alt/id";
import { Chord } from "../Chord";

export type Key = {
  pitches: PitchArray;
  rootIndex: number;
};

function getKey(chord: Chord): Key {
  return {
    pitches: chord.pitches,
    rootIndex: chord.rootIndex,
  };
}

export function getId(key: Key): string {
  return key.rootIndex + "|" + key.pitches.map(pitchGetId).join("-");
}

export const cache = new KeyMappedFlyweightCache<Chord, Key, string>( {
  getId,
  getKey,
  create: (key: Key) => new (Chord as any)(key),
} );
