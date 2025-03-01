import { Pitch } from "@datune/core/pitches/alt";
import { stringifyPitch as stringifyAltPitch } from "../diatonic";
import { alts } from "lang/generation/utils";
import { Options } from "parsing";

export function stringifyPitch(diatonicAlt: Pitch, options?: Options): string {
  return stringifyAltPitch(diatonicAlt.diatonic, options) + alts(diatonicAlt.alts);
}
