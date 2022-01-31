import { SPN } from "spns/chromatic";
import cache from "../caching/cache";
import ConcertPitch from "../ConcertPitch";

export default function fromFrequencySPN(
  frequency: number,
  spn: SPN,
): ConcertPitch {
  return cache.getOrCreate( {
    frequency,
    spn,
  } );
}
