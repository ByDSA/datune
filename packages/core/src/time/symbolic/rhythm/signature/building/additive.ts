import type { MusicalDuration } from "../../../musical-duration/MusicalDuration";
import { QUARTER } from "../../../musical-duration/constants";
import { cache } from "../caching/cache";

export function fromAdditive(
  nums: number[],
  beat: MusicalDuration = QUARTER,
) {
  return cache.getOrCreate( {
    nums,
    beat,
  } );
}
