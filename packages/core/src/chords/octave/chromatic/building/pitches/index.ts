import { Arrays } from "@datune/utils";
import { Array as PitchArray } from "pitches/chromatic";
import pitchToDto from "pitches/chromatic/caching/toDto";
import { cache } from "../../caching";
import Chord from "../../Chord";

export default function fromPitches(...pitches: PitchArray): Chord {
  const pitchesDto = pitches.map(pitchToDto) as Arrays.Number;

  return cache.getOrCreate(pitchesDto);
}
