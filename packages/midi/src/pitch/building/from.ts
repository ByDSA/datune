import { Spn } from "@datune/core/spns/chromatic";
import { cache } from "./cache";

export function from(spn: Spn, detuned: number = 0) {
  return cache.getOrCreate( {
    spn,
    detuned,
  } );
}
