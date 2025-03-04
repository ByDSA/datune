import type { MusicalDuration } from "../../musical-duration/MusicalDuration";
import type { RhythmPattern } from "../../../pattern/Pattern";
import { QUARTER } from "../../musical-duration/constants";
import { cache } from "../caching/cache";

export function fromPattern(a: RhythmPattern, beat: MusicalDuration = QUARTER) {
  const nums = a.values;

  return cache.getOrCreate( {
    nums,
    beat,
  } );
}
