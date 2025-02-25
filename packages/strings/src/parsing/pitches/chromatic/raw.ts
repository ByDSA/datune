import { getLangFromOptions } from "lang";
import { alts } from "lang/generation/utils";
import { Options } from "parsing";
import { A, AA, Ab, B, Bb, C, Cb, CC, D, Db, DD, E, Eb, F, Fb, FF, G, Gb, GG, Pitch } from "@datune/core/pitches/chromatic";
import stringify from "strings/pitches/chromatic";
import normalizeInput from "../normalizeInput";

export default function parseRaw(input: string, options?: Options): Pitch | null {
  const lang = getLangFromOptions(options);

  switch (input) {
    case normalizeInput(stringify(C, options)): return C;
    case normalizeInput(stringify(CC, options)): return CC;
    case normalizeInput(stringify(D, options)): return D;
    case normalizeInput(stringify(DD, options)): return DD;
    case normalizeInput(stringify(E, options)): return E;
    case normalizeInput(stringify(F, options)): return F;
    case normalizeInput(stringify(FF, options)): return FF;
    case normalizeInput(stringify(G, options)): return G;
    case normalizeInput(stringify(GG, options)): return GG;
    case normalizeInput(stringify(A, options)): return A;
    case normalizeInput(stringify(AA, options)): return AA;
    case normalizeInput(stringify(B, options)): return B;
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
