import { cache } from "../caching/cache";
import type { ConcertPitch } from "../ConcertPitch";
import type { SPN } from "spns/chromatic";

export function fromFrequencySPN(
  frequency: number,
  spn: SPN,
): ConcertPitch {
  return cache.getOrCreate( {
    frequency,
    spn,
  } );
}
