import { MusicalDuration, QUARTER } from "../../../musical-duration";
import { Pattern } from "../../pattern";
import cache from "../caching/cache";

export default function fromPattern(a: Pattern, beat: MusicalDuration = QUARTER) {
  const nums = a.values;

  return cache.getOrCreate( {
    nums,
    beat,
  } );
}
