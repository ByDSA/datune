import { A as C_A, B as C_B, C as C_C, D as C_D, E as C_E, F as C_F, G as C_G, Pitch as Chromatic } from "pitches/chromatic";
import { A, B, C, D, E, F, G } from "../constants";
import Diatonic from "../Diatonic";

export default function toChromatic(diatonic: Diatonic): Chromatic {
  switch (diatonic) {
    case C: return C_C;
    case D: return C_D;
    case E: return C_E;
    case F: return C_F;
    case G: return C_G;
    case A: return C_A;
    case B: return C_B;
    default: throw new Error(String(diatonic));
  }
}
