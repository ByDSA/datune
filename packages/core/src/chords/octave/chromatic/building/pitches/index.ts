import { Arrays } from "@datune/utils";
import { cache } from "../../caching/cache";
import { Chord } from "../../Chord";
import type { PitchArray } from "pitches/chromatic";
import { toDto as pitchToDto } from "pitches/chromatic/caching/toDto";

export function fromPitches(...pitches: PitchArray): Chord {
  const pitchesDto = pitches.map(pitchToDto) as Arrays.Number;

  return cache.getOrCreate(pitchesDto);
}
