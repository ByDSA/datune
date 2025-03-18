import { OctavePitch } from "pitches/OctavePitch";
import { Spn } from "../Spn";

export interface SymbolicSpn<P extends OctavePitch>
extends Spn {
  pitch: P;
  octave: number;
}
