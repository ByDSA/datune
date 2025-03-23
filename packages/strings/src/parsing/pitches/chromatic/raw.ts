import { Pitch, Pitches as P } from "@datune/core/pitches/chromatic";
import { getLangFromOptions } from "lang";
import { alts } from "lang/generation/utils";
import { Options } from "parsing";
import { stringifyPitch } from "strings/pitches/chromatic";
import { normalizeInput } from "../normalizeInput";

export function parseRaw(input: string, options?: Options): Pitch | null {
  const lang = getLangFromOptions(options);

  switch (input) {
    case normalizeInput(stringifyPitch(P.C, options)): return P.C;
    case normalizeInput(stringifyPitch(P.CC, options)): return P.CC;
    case normalizeInput(stringifyPitch(P.D, options)): return P.D;
    case normalizeInput(stringifyPitch(P.DD, options)): return P.DD;
    case normalizeInput(stringifyPitch(P.E, options)): return P.E;
    case normalizeInput(stringifyPitch(P.F, options)): return P.F;
    case normalizeInput(stringifyPitch(P.FF, options)): return P.FF;
    case normalizeInput(stringifyPitch(P.G, options)): return P.G;
    case normalizeInput(stringifyPitch(P.GG, options)): return P.GG;
    case normalizeInput(stringifyPitch(P.A, options)): return P.A;
    case normalizeInput(stringifyPitch(P.AA, options)): return P.AA;
    case normalizeInput(stringifyPitch(P.B, options)): return P.B;
    case normalizeInput(lang.diatonic.C + alts(-1)): return P.Cb;
    case normalizeInput(lang.diatonic.D + alts(-1)): return P.Db;
    case normalizeInput(lang.diatonic.E + alts(-1)): return P.Eb;
    case normalizeInput(lang.diatonic.F + alts(-1)): return P.Fb;
    case normalizeInput(lang.diatonic.G + alts(-1)): return P.Gb;
    case normalizeInput(lang.diatonic.A + alts(-1)): return P.Ab;
    case normalizeInput(lang.diatonic.B + alts(-1)): return P.Bb;
    case normalizeInput(lang.diatonic.C + alts(-2)): return P.Bb;
    case normalizeInput(lang.diatonic.D + alts(-2)): return P.C;
    case normalizeInput(lang.diatonic.E + alts(-2)): return P.D;
    case normalizeInput(lang.diatonic.F + alts(-2)): return P.Eb;
    case normalizeInput(lang.diatonic.G + alts(-2)): return P.F;
    case normalizeInput(lang.diatonic.A + alts(-2)): return P.G;
    case normalizeInput(lang.diatonic.B + alts(-2)): return P.A;
    case normalizeInput(lang.diatonic.C + alts(-3)): return P.A;
    case normalizeInput(lang.diatonic.D + alts(-3)): return P.B;
    case normalizeInput(lang.diatonic.E + alts(-3)): return P.CC;
    case normalizeInput(lang.diatonic.F + alts(-3)): return P.D;
    case normalizeInput(lang.diatonic.G + alts(-3)): return P.E;
    case normalizeInput(lang.diatonic.A + alts(-3)): return P.FF;
    case normalizeInput(lang.diatonic.B + alts(-3)): return P.GG;
    case normalizeInput(lang.diatonic.C + alts(2)): return P.D;
    case normalizeInput(lang.diatonic.D + alts(2)): return P.E;
    case normalizeInput(lang.diatonic.E + alts(2)): return P.FF;
    case normalizeInput(lang.diatonic.F + alts(2)): return P.G;
    case normalizeInput(lang.diatonic.G + alts(2)): return P.A;
    case normalizeInput(lang.diatonic.A + alts(2)): return P.B;
    case normalizeInput(lang.diatonic.B + alts(2)): return P.CC;
    case normalizeInput(lang.diatonic.C + alts(3)): return P.DD;
    case normalizeInput(lang.diatonic.D + alts(3)): return P.F;
    case normalizeInput(lang.diatonic.E + alts(3)): return P.G;
    case normalizeInput(lang.diatonic.F + alts(3)): return P.GG;
    case normalizeInput(lang.diatonic.G + alts(3)): return P.AA;
    case normalizeInput(lang.diatonic.A + alts(3)): return P.C;
    case normalizeInput(lang.diatonic.B + alts(3)): return P.D;
    default: return null;
  }
}
