import type { Pitch } from "pitches/chromatic";
import type { Spn } from "../../Spn";
import { getObjId as pitchGetId } from "pitches/chromatic/caching/id";

export type Key = {
  pitch: Pitch;
  octave: number;
 };

export function getId(key: Key): string {
  return `(${pitchGetId(key.pitch)})|${key.octave}`;
}

export function getKey(spn: Spn): Key {
  return {
    pitch: spn.pitch,
    octave: spn.octave,
  };
}
