import { Pitch } from "@datune/core/pitches/diatonic";
import { A, B, C, D, E, F, G } from "@datune/core/pitches/diatonic/constants";
import { getLangFromOptions } from "lang/Options";
import { Options } from "parsing";

export function stringifyPitch(pitch: Pitch, options?: Options): string {
  const lang = getLangFromOptions(options);

  switch (pitch) {
    case C: return lang.diatonic.C;
    case D: return lang.diatonic.D;
    case E: return lang.diatonic.E;
    case F: return lang.diatonic.F;
    case G: return lang.diatonic.G;
    case A: return lang.diatonic.A;
    case B: return lang.diatonic.B;
    default: return `[Diatonic = ${+pitch}]`;
  }
}
