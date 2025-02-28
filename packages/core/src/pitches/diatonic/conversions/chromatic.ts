import { A, B, C, D, E, F, G } from "../constants";
import type { Pitch } from "../Pitch";
import { Pitches as ChromaticPitches, Pitch as Chromatic } from "pitches/chromatic";

export function toChromatic(diatonic: Pitch): Chromatic {
  switch (diatonic) {
    case C: return ChromaticPitches.C;
    case D: return ChromaticPitches.D;
    case E: return ChromaticPitches.E;
    case F: return ChromaticPitches.F;
    case G: return ChromaticPitches.G;
    case A: return ChromaticPitches.A;
    case B: return ChromaticPitches.B;
    default: throw new Error(String(diatonic));
  }
}
