import type { Arrays } from "@datune/utils";
import type { PitchArray } from "pitches/chromatic";
import { toDto as pitchToDto } from "pitches/chromatic/caching/toDto";
import { cache } from "../../caching/cache";
import { Chord } from "../../Chord";

export function fromPitches(...pitches: PitchArray): Chord {
  const pitchesDto = pitches.map(pitchToDto) as Arrays.Number;

  return cache.getOrCreate(pitchesDto);
}
