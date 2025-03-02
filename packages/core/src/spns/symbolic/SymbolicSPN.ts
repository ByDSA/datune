import { SPN } from "../SPN";
import { OctavePitch } from "pitches/OctavePitch";

export interface SymbolicSPN<P extends OctavePitch>
extends SPN {
  pitch: P;
  octave: number;
}
