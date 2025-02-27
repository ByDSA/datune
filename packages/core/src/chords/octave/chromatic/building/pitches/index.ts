import { Arrays } from "@datune/utils";
import { cache } from "../../caching";
import Chord from "../../Chord";
import { PitchArray } from "pitches/chromatic";
import pitchToDto from "pitches/chromatic/caching/toDto";

export function fromPitches(...pitches: PitchArray): Chord {
  const pitchesDto = pitches.map(pitchToDto) as Arrays.Number;

  return cache.getOrCreate(pitchesDto);
}
