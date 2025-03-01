import { Pitch } from "@datune/core/pitches/chromatic";
import { A, AA, Ab, B, Bb, C, Cb, CC, D, Db, DD, E, Eb, F, Fb, FF, G, Gb, GG } from "@datune/core/pitches/chromatic/constants";
import { normalizeInput } from "../normalizeInput";
import { getLangFromOptions } from "lang";
import { alts } from "lang/generation/utils";
import { Options } from "parsing";
import { stringifyPitch } from "strings/pitches/chromatic";

export function parseRaw(input: string, options?: Options): Pitch | null {
  const lang = getLangFromOptions(options);

  switch (input) {
    case normalizeInput(stringifyPitch(C, options)): return C;
    case normalizeInput(stringifyPitch(CC, options)): return CC;
    case normalizeInput(stringifyPitch(D, options)): return D;
    case normalizeInput(stringifyPitch(DD, options)): return DD;
    case normalizeInput(stringifyPitch(E, options)): return E;
    case normalizeInput(stringifyPitch(F, options)): return F;
    case normalizeInput(stringifyPitch(FF, options)): return FF;
    case normalizeInput(stringifyPitch(G, options)): return G;
    case normalizeInput(stringifyPitch(GG, options)): return GG;
    case normalizeInput(stringifyPitch(A, options)): return A;
    case normalizeInput(stringifyPitch(AA, options)): return AA;
    case normalizeInput(stringifyPitch(B, options)): return B;
    case normalizeInput(lang.diatonic.C + alts(-1)): return Cb;
    case normalizeInput(lang.diatonic.D + alts(-1)): return Db;
    case normalizeInput(lang.diatonic.E + alts(-1)): return Eb;
    case normalizeInput(lang.diatonic.F + alts(-1)): return Fb;
    case normalizeInput(lang.diatonic.G + alts(-1)): return Gb;
    case normalizeInput(lang.diatonic.A + alts(-1)): return Ab;
    case normalizeInput(lang.diatonic.B + alts(-1)): return Bb;
    case normalizeInput(lang.diatonic.C + alts(-2)): return Bb;
    case normalizeInput(lang.diatonic.D + alts(-2)): return C;
    case normalizeInput(lang.diatonic.E + alts(-2)): return D;
    case normalizeInput(lang.diatonic.F + alts(-2)): return Eb;
    case normalizeInput(lang.diatonic.G + alts(-2)): return F;
    case normalizeInput(lang.diatonic.A + alts(-2)): return G;
    case normalizeInput(lang.diatonic.B + alts(-2)): return A;
    case normalizeInput(lang.diatonic.C + alts(-3)): return A;
    case normalizeInput(lang.diatonic.D + alts(-3)): return B;
    case normalizeInput(lang.diatonic.E + alts(-3)): return CC;
    case normalizeInput(lang.diatonic.F + alts(-3)): return D;
    case normalizeInput(lang.diatonic.G + alts(-3)): return E;
    case normalizeInput(lang.diatonic.A + alts(-3)): return FF;
    case normalizeInput(lang.diatonic.B + alts(-3)): return GG;
    case normalizeInput(lang.diatonic.C + alts(2)): return D;
    case normalizeInput(lang.diatonic.D + alts(2)): return E;
    case normalizeInput(lang.diatonic.E + alts(2)): return FF;
    case normalizeInput(lang.diatonic.F + alts(2)): return G;
    case normalizeInput(lang.diatonic.G + alts(2)): return A;
    case normalizeInput(lang.diatonic.A + alts(2)): return B;
    case normalizeInput(lang.diatonic.B + alts(2)): return CC;
    case normalizeInput(lang.diatonic.C + alts(3)): return DD;
    case normalizeInput(lang.diatonic.D + alts(3)): return F;
    case normalizeInput(lang.diatonic.E + alts(3)): return G;
    case normalizeInput(lang.diatonic.F + alts(3)): return GG;
    case normalizeInput(lang.diatonic.G + alts(3)): return AA;
    case normalizeInput(lang.diatonic.A + alts(3)): return C;
    case normalizeInput(lang.diatonic.B + alts(3)): return D;
    default: return null;
  }
}
