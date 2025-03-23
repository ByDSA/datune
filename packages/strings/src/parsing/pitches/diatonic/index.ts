import { Pitch, Pitches as P } from "@datune/core/pitches/diatonic";
import { Options } from "lang";
import { stringifyPitch } from "strings/pitches/diatonic";

export function parsePitch(strValue: string, options?: Options): Pitch | null {
  const fixedStrValue = normalizeInputString(strValue);

  switch (fixedStrValue) {
    case stringifyPitch(P.C, options): return P.C;
    case stringifyPitch(P.D, options): return P.D;
    case stringifyPitch(P.E, options): return P.E;
    case stringifyPitch(P.F, options): return P.F;
    case stringifyPitch(P.G, options): return P.G;
    case stringifyPitch(P.A, options): return P.A;
    case stringifyPitch(P.B, options): return P.B;
    default: return null;
  }
}

function normalizeInputString(strValue: string): string {
  return strValue.replace(/ /g, "");
}
