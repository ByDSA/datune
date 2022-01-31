import { alts } from "lang/generation/utils";
import { Options } from "parsing";
import { Pitch } from "pitches/alt";
import DStringify from "../diatonic";

export default function stringify(diatonicAlt: Pitch, options?: Options): string {
  return DStringify(diatonicAlt.diatonic, options) + alts(diatonicAlt.alts);
}
