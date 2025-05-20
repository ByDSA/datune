import { KeyMappedFlyweightCache } from "datils/patterns/caching";
import { getKey as pitchGetKey } from "pitches/chromatic/caching/id";
import { PitchArray } from "chromatic";
import { Chord } from "../Chord";

export type Key = {
  rootIndex: number;
  pitches: PitchArray;
};

export const getKey = (chord: Chord): Key => {
  return {
    pitches: chord.pitches,
    rootIndex: chord.rootIndex,
  };
};

export function getId(key: Key): string {
  return key.rootIndex + "|" + key.pitches.map(pitchGetKey).join("-");
}

export const cache = new KeyMappedFlyweightCache<Chord, Key, string>( {
  getId,
  getKey,
  create: (key)=> new (Chord as any)(key),
} );
