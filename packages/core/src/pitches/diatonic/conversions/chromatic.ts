import type { Pitch } from "../Pitch";
import { Pitches as CP, Pitch as CPitch } from "pitches/chromatic";
import { A, B, C, D, E, F, G } from "../constants";

export function toChromatic(diatonic: Pitch): CPitch {
  switch (diatonic) {
    case C: return CP.C;
    case D: return CP.D;
    case E: return CP.E;
    case F: return CP.F;
    case G: return CP.G;
    case A: return CP.A;
    case B: return CP.B;
    default: throw new Error(String(diatonic));
  }
}
