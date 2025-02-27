import { A, B, C, D, E, F, G } from "../constants";
import Diatonic from "../Diatonic";
import { Pitches as ChromaticPitches, Pitch as Chromatic } from "pitches/chromatic";

export function toChromatic(diatonic: Diatonic): Chromatic {
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
