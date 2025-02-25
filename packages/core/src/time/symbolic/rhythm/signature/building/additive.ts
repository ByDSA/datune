import { MusicalDuration, QUARTER } from "../../../musical-duration";
import cache from "../caching/cache";

export default function fromAdditive(nums: number[], beat: MusicalDuration = QUARTER) {
  return cache.getOrCreate( {
    nums,
    beat,
  } );
}
