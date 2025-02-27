import { QUARTER } from "../../../musical-duration/constants";
import { default as MusicalDuration } from "../../../musical-duration/MusicalDuration";
import { default as Pattern } from "../../pattern/Pattern";
import cache from "../caching/cache";

export default function fromPattern(a: Pattern, beat: MusicalDuration = QUARTER) {
  const nums = a.values;

  return cache.getOrCreate( {
    nums,
    beat,
  } );
}
