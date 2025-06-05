import type { OctavePitch } from "pitches/OctavePitch";
import type { Spn } from "../Spn";

export interface SymbolicSpn<I, P extends OctavePitch<I>>
extends Spn {
  pitch: P;
  octave: number;

  withShifted(interval: I): SymbolicSpn<I, P> | null;
  withShiftedDown(interval: I): SymbolicSpn<I, P> | null;
  withOctave(octave: number): SymbolicSpn<I, P> | null;
  withPitch(pitch: P): SymbolicSpn<I, P> | null;
}
