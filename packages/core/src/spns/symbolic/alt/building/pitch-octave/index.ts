import type { Spn } from "../../Spn";
import type { Key } from "../cache";
import type { Pitch } from "pitches/alt";
import { cache } from "../cache";

export function fromPitchOctave(pitch: Pitch, octave: number): Spn | null {
  if (octave > 10 || octave <= -2)
    return null;

  const key: Key = {
    pitch,
    octave,
  };

  return cache.getOrCreate(key);
}
