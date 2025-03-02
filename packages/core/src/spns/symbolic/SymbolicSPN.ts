import { OctavePitch } from "pitches/OctavePitch";
import { SPN } from "../SPN";

export interface SymbolicSPN<P extends OctavePitch>
extends SPN {
  pitch: P;
  octave: number;
}
