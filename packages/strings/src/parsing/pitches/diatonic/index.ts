import { Pitch } from "@datune/core/pitches/diatonic";
import { A, B, C, D, E, F, G } from "@datune/core/pitches/diatonic/constants";
import { Options } from "lang";
import { stringifyPitch } from "strings/pitches/diatonic";

export function parsePitch(strValue: string, options?: Options): Pitch | null {
  const fixedStrValue = normalizeInputString(strValue);

  switch (fixedStrValue) {
    case stringifyPitch(C, options): return C;
    case stringifyPitch(D, options): return D;
    case stringifyPitch(E, options): return E;
    case stringifyPitch(F, options): return F;
    case stringifyPitch(G, options): return G;
    case stringifyPitch(A, options): return A;
    case stringifyPitch(B, options): return B;
    default: return null;
  }
}

function normalizeInputString(strValue: string): string {
  return strValue.replace(/ /g, "");
}
