import { alts } from "lang/generation/utils";
import { getLangFromOptions } from "lang/Options";
import { Options } from "parsing";
import { A, AA, B, C, CC, D, DD, E, F, FF, G, GG, Pitch as Chromatic } from "@datune/core/pitches/chromatic";

export default function f(obj: Chromatic, options?: Options): string {
  const lang = getLangFromOptions(options);

  switch (obj) {
    case C: return lang.diatonic.C;
    case CC: return lang.diatonic.C + alts(1);
    case D: return lang.diatonic.D;
    case DD: return lang.diatonic.D + alts(1);
    case E: return lang.diatonic.E;
    case F: return lang.diatonic.F;
    case FF: return lang.diatonic.F + alts(1);
    case G: return lang.diatonic.G;
    case GG: return lang.diatonic.G + alts(1);
    case A: return lang.diatonic.A;
    case AA: return lang.diatonic.A + alts(1);
    case B: return lang.diatonic.B;
    default: throw new Error();
  }
}
