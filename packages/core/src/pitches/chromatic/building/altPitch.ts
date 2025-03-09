import type { Pitch as APitch } from "alt";
import type { Pitch } from "..";
import { fromInt } from "./int";
import { fromDPitch } from "./dPitch";

export function fromAltPitch(aPitch: APitch): Pitch {
  const intValue = +fromDPitch(aPitch.diatonic) + aPitch.alts;

  return fromInt(intValue);
}
