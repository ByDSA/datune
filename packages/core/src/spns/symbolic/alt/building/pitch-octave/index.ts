import type { SPN } from "../../SPN";
import type { Dto } from "../dto/Dto";
import type { Pitch } from "pitches/alt";
import { cache } from "../cache";

export function fromPitchOctave(pitch: Pitch, octave: number): SPN | null {
  if (octave > 10 || octave <= -2)
    return null;

  const dto: Dto = {
    pitch,
    octave,
  };

  return cache.getOrCreate(dto);
}
