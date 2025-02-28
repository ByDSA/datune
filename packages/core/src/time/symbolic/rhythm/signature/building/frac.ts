import { from as musicalDurationFrom } from "../../../musical-duration/building/from";
import { cache } from "../caching/cache";

export function fromFrac(n: number, d: number = 4) {
  const beat = musicalDurationFrom(1 / d);
  const nums = [n];

  return cache.getOrCreate( {
    nums,
    beat,
  } );
}
