import type { Pitch } from "../Pitch";
import type { Pitch as DPitch } from "pitches/diatonic";
import type { Pitch as CPitch } from "pitches/chromatic";
import { fromDPitch as cPitchFromDPitch } from "pitches/chromatic/building";
import { fixAlts } from "../fixAlts";
import { fromDPitchAlts } from "./diatonicAlts";

export function fromChromaticAndDiatonic(cPitch: CPitch, dPitch: DPitch): Pitch {
  const alts = getAltsFromChromaticAndDiatonic(cPitch, dPitch);

  return fromDPitchAlts(dPitch, alts);
}

function getAltsFromChromaticAndDiatonic(chromatic: CPitch, diatonic: DPitch): number {
  let alts = +chromatic - +cPitchFromDPitch(diatonic);

  return fixAlts(alts);
}
