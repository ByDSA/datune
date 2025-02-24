import { Options } from "lang";
import { A, B, C, D, E, F, G, Pitch } from "@datune/core/pitches/diatonic";
import stringify from "strings/pitches/diatonic";

export default function parse(strValue: string, options?: Options): Pitch | null {
  const fixedStrValue = normalizeInputString(strValue);

  switch (fixedStrValue) {
    case stringify(C, options): return C;
    case stringify(D, options): return D;
    case stringify(E, options): return E;
    case stringify(F, options): return F;
    case stringify(G, options): return G;
    case stringify(A, options): return A;
    case stringify(B, options): return B;
    default: return null;
  }
}

function normalizeInputString(strValue: string): string {
  return strValue.replace(/ /g, "");
}
