import { Array as PitchArray } from "pitches/alt";
import cache from "../../caching/cache";
import Chord from "../../Chord";

export default function fromPitches(...pitches: PitchArray): Chord {
  return cache.getOrCreate(pitches);
}
