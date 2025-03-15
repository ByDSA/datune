import type { MusicalDuration } from "../../musical-duration";
import { KeyMappedFlyweightCache } from "@datune/utils";
import { TimeSignature } from "../TimeSignature";

export type Key = {
  nums: number[];
  beat: MusicalDuration;
};

export function getId(key: Key): string {
  return `${key.nums.join("-")}|${String(+key.beat)}`;
}

export function getKey(ts: TimeSignature): Key {
  return {
    nums: ts.numerators,
    beat: ts.denominatorBeat,
  };
}

export const cache = new KeyMappedFlyweightCache<TimeSignature, Key, string>( {
  getId,
  getKey,
  create: key=>new (TimeSignature as any)(key),
} );
