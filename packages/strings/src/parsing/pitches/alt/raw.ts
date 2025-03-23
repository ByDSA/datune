import { Pitch, Pitches as P } from "@datune/core/pitches/alt";
import { Options } from "parsing";
import { stringifyPitch } from "strings/pitches/alt";
import { normalizeInput } from "../normalizeInput";

export function parseRaw(input: string, options?: Options): Pitch | null {
  switch (input) {
    case normalizeInput(stringifyPitch(P.C, options)): return P.C;
    case normalizeInput(stringifyPitch(P.CC, options)): return P.CC;
    case normalizeInput(stringifyPitch(P.CCC, options)): return P.CCC;
    case normalizeInput(stringifyPitch(P.CCCC, options)): return P.CCCC;
    case normalizeInput(stringifyPitch(P.Cb, options)): return P.Cb;
    case normalizeInput(stringifyPitch(P.Cbb, options)): return P.Cbb;
    case normalizeInput(stringifyPitch(P.Cbbb, options)): return P.Cbbb;
    case normalizeInput(stringifyPitch(P.D, options)): return P.D;
    case normalizeInput(stringifyPitch(P.DD, options)): return P.DD;
    case normalizeInput(stringifyPitch(P.DDD, options)): return P.DDD;
    case normalizeInput(stringifyPitch(P.DDDD, options)): return P.DDDD;
    case normalizeInput(stringifyPitch(P.Db, options)): return P.Db;
    case normalizeInput(stringifyPitch(P.Dbb, options)): return P.Dbb;
    case normalizeInput(stringifyPitch(P.Dbbb, options)): return P.Dbbb;
    case normalizeInput(stringifyPitch(P.E, options)): return P.E;
    case normalizeInput(stringifyPitch(P.EE, options)): return P.EE;
    case normalizeInput(stringifyPitch(P.EEE, options)): return P.EEE;
    case normalizeInput(stringifyPitch(P.EEEE, options)): return P.EEEE;
    case normalizeInput(stringifyPitch(P.Eb, options)): return P.Eb;
    case normalizeInput(stringifyPitch(P.Ebb, options)): return P.Ebb;
    case normalizeInput(stringifyPitch(P.Ebbb, options)): return P.Ebbb;
    case normalizeInput(stringifyPitch(P.F, options)): return P.F;
    case normalizeInput(stringifyPitch(P.FF, options)): return P.FF;
    case normalizeInput(stringifyPitch(P.FFF, options)): return P.FFF;
    case normalizeInput(stringifyPitch(P.FFFF, options)): return P.FFFF;
    case normalizeInput(stringifyPitch(P.Fb, options)): return P.Fb;
    case normalizeInput(stringifyPitch(P.Fbb, options)): return P.Fbb;
    case normalizeInput(stringifyPitch(P.Fbbb, options)): return P.Fbbb;
    case normalizeInput(stringifyPitch(P.G, options)): return P.G;
    case normalizeInput(stringifyPitch(P.GG, options)): return P.GG;
    case normalizeInput(stringifyPitch(P.GGG, options)): return P.GGG;
    case normalizeInput(stringifyPitch(P.GGGG, options)): return P.GGGG;
    case normalizeInput(stringifyPitch(P.Gb, options)): return P.Gb;
    case normalizeInput(stringifyPitch(P.Gbb, options)): return P.Gbb;
    case normalizeInput(stringifyPitch(P.Gbbb, options)): return P.Gbbb;
    case normalizeInput(stringifyPitch(P.A, options)): return P.A;
    case normalizeInput(stringifyPitch(P.AA, options)): return P.AA;
    case normalizeInput(stringifyPitch(P.AAA, options)): return P.AAA;
    case normalizeInput(stringifyPitch(P.AAAA, options)): return P.AAAA;
    case normalizeInput(stringifyPitch(P.Ab, options)): return P.Ab;
    case normalizeInput(stringifyPitch(P.Abb, options)): return P.Abb;
    case normalizeInput(stringifyPitch(P.Abbb, options)): return P.Abbb;
    case normalizeInput(stringifyPitch(P.B, options)): return P.B;
    case normalizeInput(stringifyPitch(P.BB, options)): return P.BB;
    case normalizeInput(stringifyPitch(P.BBB, options)): return P.BBB;
    case normalizeInput(stringifyPitch(P.BBBB, options)): return P.BBBB;
    case normalizeInput(stringifyPitch(P.Bb, options)): return P.Bb;
    case normalizeInput(stringifyPitch(P.Bbb, options)): return P.Bbb;
    case normalizeInput(stringifyPitch(P.Bbbb, options)): return P.Bbbb;
    default: return null;
  }
}
