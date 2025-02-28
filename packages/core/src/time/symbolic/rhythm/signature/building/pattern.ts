import { QUARTER } from "../../../musical-duration/constants";
import type { MusicalDuration } from "../../../musical-duration/MusicalDuration";
import type { Pattern } from "../../pattern/Pattern";
import { cache } from "../caching/cache";

export function fromPattern(a: Pattern, beat: MusicalDuration = QUARTER) {
  const nums = a.values;

  return cache.getOrCreate( {
    nums,
    beat,
  } );
}
