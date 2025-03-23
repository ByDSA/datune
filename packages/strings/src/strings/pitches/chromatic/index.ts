import { Pitch } from "@datune/core/pitches/chromatic";
import { Pitches as P } from "@datune/core/pitches/chromatic";
import { alts } from "lang/generation/utils";
import { getLangFromOptions } from "lang/Options";
import { Options } from "parsing";

export function stringifyPitch(obj: Pitch, options?: Options): string {
  const lang = getLangFromOptions(options);

  switch (obj) {
    case P.C: return lang.diatonic.C;
    case P.CC: return lang.diatonic.C + alts(1);
    case P.D: return lang.diatonic.D;
    case P.DD: return lang.diatonic.D + alts(1);
    case P.E: return lang.diatonic.E;
    case P.F: return lang.diatonic.F;
    case P.FF: return lang.diatonic.F + alts(1);
    case P.G: return lang.diatonic.G;
    case P.GG: return lang.diatonic.G + alts(1);
    case P.A: return lang.diatonic.A;
    case P.AA: return lang.diatonic.A + alts(1);
    case P.B: return lang.diatonic.B;
    default: throw new Error();
  }
}
