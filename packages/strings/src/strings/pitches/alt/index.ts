import { Pitch } from "@datune/core/pitches/alt";
import { alts } from "lang/generation/utils";
import { Options } from "parsing";
import { stringifyPitch as stringifyAltPitch } from "../diatonic";

export function stringifyPitch(diatonicAlt: Pitch, options?: Options): string {
  return stringifyAltPitch(diatonicAlt.diatonic, options) + alts(diatonicAlt.alts);
}
