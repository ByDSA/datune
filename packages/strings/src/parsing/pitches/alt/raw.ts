import { Options } from "parsing";
import { A, AA, AAA, AAAA, Ab, Abb, Abbb, B, BB, Bb, BBB, Bbb, BBBB, Bbbb, C, Cb, Cbb, Cbbb, CC, CCC, CCCC, D, Db, Dbb, Dbbb, DD, DDD, DDDD, E, Eb, Ebb, Ebbb, EE, EEE, EEEE, F, Fb, Fbb, Fbbb, FF, FFF, FFFF, G, Gb, Gbb, Gbbb, GG, GGG, GGGG, Pitch } from "@datune/core/pitches/alt";
import stringify from "strings/pitches/alt";
import normalizeInput from "../normalizeInput";

export default function parseRaw(input: string, options?: Options): Pitch | null {
  switch (input) {
    case normalizeInput(stringify(C, options)): return C;
    case normalizeInput(stringify(CC, options)): return CC;
    case normalizeInput(stringify(CCC, options)): return CCC;
    case normalizeInput(stringify(CCCC, options)): return CCCC;
    case normalizeInput(stringify(Cb, options)): return Cb;
    case normalizeInput(stringify(Cbb, options)): return Cbb;
    case normalizeInput(stringify(Cbbb, options)): return Cbbb;
    case normalizeInput(stringify(D, options)): return D;
    case normalizeInput(stringify(DD, options)): return DD;
    case normalizeInput(stringify(DDD, options)): return DDD;
    case normalizeInput(stringify(DDDD, options)): return DDDD;
    case normalizeInput(stringify(Db, options)): return Db;
    case normalizeInput(stringify(Dbb, options)): return Dbb;
    case normalizeInput(stringify(Dbbb, options)): return Dbbb;
    case normalizeInput(stringify(E, options)): return E;
    case normalizeInput(stringify(EE, options)): return EE;
    case normalizeInput(stringify(EEE, options)): return EEE;
    case normalizeInput(stringify(EEEE, options)): return EEEE;
    case normalizeInput(stringify(Eb, options)): return Eb;
    case normalizeInput(stringify(Ebb, options)): return Ebb;
    case normalizeInput(stringify(Ebbb, options)): return Ebbb;
    case normalizeInput(stringify(F, options)): return F;
    case normalizeInput(stringify(FF, options)): return FF;
    case normalizeInput(stringify(FFF, options)): return FFF;
    case normalizeInput(stringify(FFFF, options)): return FFFF;
    case normalizeInput(stringify(Fb, options)): return Fb;
    case normalizeInput(stringify(Fbb, options)): return Fbb;
    case normalizeInput(stringify(Fbbb, options)): return Fbbb;
    case normalizeInput(stringify(G, options)): return G;
    case normalizeInput(stringify(GG, options)): return GG;
    case normalizeInput(stringify(GGG, options)): return GGG;
    case normalizeInput(stringify(GGGG, options)): return GGGG;
    case normalizeInput(stringify(Gb, options)): return Gb;
    case normalizeInput(stringify(Gbb, options)): return Gbb;
    case normalizeInput(stringify(Gbbb, options)): return Gbbb;
    case normalizeInput(stringify(A, options)): return A;
    case normalizeInput(stringify(AA, options)): return AA;
    case normalizeInput(stringify(AAA, options)): return AAA;
    case normalizeInput(stringify(AAAA, options)): return AAAA;
    case normalizeInput(stringify(Ab, options)): return Ab;
    case normalizeInput(stringify(Abb, options)): return Abb;
    case normalizeInput(stringify(Abbb, options)): return Abbb;
    case normalizeInput(stringify(B, options)): return B;
    case normalizeInput(stringify(BB, options)): return BB;
    case normalizeInput(stringify(BBB, options)): return BBB;
    case normalizeInput(stringify(BBBB, options)): return BBBB;
    case normalizeInput(stringify(Bb, options)): return Bb;
    case normalizeInput(stringify(Bbb, options)): return Bbb;
    case normalizeInput(stringify(Bbbb, options)): return Bbbb;
    default: return null;
  }
}
