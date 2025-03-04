import type { Pitch } from "../Pitch";
import { Pitches as CP } from "pitches/chromatic";
import { Pitches as DP } from "pitches/diatonic";

export function toChromatic(obj: Pitch) {
  const intValue = +DP.toChromatic(obj.diatonic) + obj.alts;

  return CP.fromInt(intValue);
}
