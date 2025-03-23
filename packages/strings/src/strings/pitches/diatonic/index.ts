import { Pitch } from "@datune/core/pitches/diatonic";
import { Pitches as P } from "@datune/core/pitches/diatonic";
import { getLangFromOptions } from "lang/Options";
import { Options } from "parsing";

export function stringifyPitch(pitch: Pitch, options?: Options): string {
  const lang = getLangFromOptions(options);

  switch (pitch) {
    case P.C: return lang.diatonic.C;
    case P.D: return lang.diatonic.D;
    case P.E: return lang.diatonic.E;
    case P.F: return lang.diatonic.F;
    case P.G: return lang.diatonic.G;
    case P.A: return lang.diatonic.A;
    case P.B: return lang.diatonic.B;
    default: return `[Diatonic = ${+pitch}]`;
  }
}
