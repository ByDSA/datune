import type { Pitch as DPitch } from "pitches/diatonic";
import type { Pitch } from "pitches/chromatic";
import * as CP from "pitches/chromatic/constants";
import { A, B, C, D, E, F, G } from "pitches/diatonic/constants";

export function fromDPitch(dPitch: DPitch): Pitch {
  switch (dPitch) {
    case C: return CP.C;
    case D: return CP.D;
    case E: return CP.E;
    case F: return CP.F;
    case G: return CP.G;
    case A: return CP.A;
    case B: return CP.B;
    default: throw new Error(String(dPitch));
  }
}
