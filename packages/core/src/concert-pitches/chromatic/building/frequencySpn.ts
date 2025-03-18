import type { ConcertPitch } from "../ConcertPitch";
import type { Spn } from "spns/chromatic";
import { cache } from "../caching/cache";

export function fromFrequencySpn(
  frequency: number,
  spn: Spn,
): ConcertPitch {
  return cache.getOrCreate( {
    frequency,
    spn,
  } );
}
