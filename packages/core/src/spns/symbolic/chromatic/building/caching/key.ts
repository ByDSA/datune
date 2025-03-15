import type { Pitch } from "pitches/chromatic";
import type { SPN } from "../../SPN";
import { getObjId as pitchGetId } from "pitches/chromatic/caching/id";

export type Key = {
  pitch: Pitch;
  octave: number;
 };

export function getId(key: Key): string {
  return `(${pitchGetId(key.pitch)})|${key.octave}`;
}

export function getKey(spn: SPN): Key {
  return {
    pitch: spn.pitch,
    octave: spn.octave,
  };
}
